#!/usr/bin/env node
/**
 * validate-content-single.mjs
 * Validates a single content file against the Keystatic schemas.
 * No external dependencies — uses only fs, path, url.
 *
 * Usage: node scripts/validate-content-single.mjs content/members/new-member.json
 *        pnpm validate:file content/members/new-member.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ─── Schema definitions ───────────────────────────────────────────────────────

const SCHEMAS = {
  member: {
    required: ['name'],
    urlFields: ['twitterUrl', 'githubUrl', 'linkedinUrl', 'websiteUrl'],
    enumFields: {
      guild: ['dev', 'design', 'writers', 'ops'],
      city: ['sydney', 'melbourne', 'brisbane', 'perth', 'adelaide', 'remote', 'other'],
    },
    arrayFields: ['ecosystemTags'],
  },
  event: {
    required: ['title', 'date'],
    urlFields: ['locationUrl', 'rsvpUrl', 'recapUrl'],
    enumFields: {
      type: ['hackathon', 'builder-session', 'networking', 'summit', 'other'],
    },
    arrayFields: ['tags'],
  },
  project: {
    required: ['title'],
    urlFields: ['url', 'githubUrl'],
    enumFields: {
      category: ['defi', 'depin', 'gaming', 'nft', 'infra', 'security', 'community', 'dao', 'hackathon', 'other'],
      status: ['active', 'in_development', 'demo_day_winner', 'hackathon', 'honourable_mention', 'historical', 'archived', 'unknown'],
    },
    enumArrayFields: {
      region: ['AU', 'NZ', 'Global', 'APAC'],
    },
    arrayFields: ['authorSlugs'],
  },
  partner: {
    required: ['name'],
    urlFields: ['url'],
    enumFields: {
      tier: ['platinum', 'gold', 'silver', 'community'],
    },
    arrayFields: [],
  },
  post: {
    required: ['title', 'publishedAt'],
    urlFields: [],
    enumFields: {
      category: ['ecosystem-update', 'member-story', 'event-recap', 'tutorial', 'announcement'],
    },
    arrayFields: ['tags'],
  },
  'site-config': {
    required: ['heroHeadline', 'heroSubheadline', 'membersCount', 'eventsCount', 'projectsCount', 'totalEarned', 'telegramUrl', 'twitterUrl', 'earnUrl', 'contactEmail'],
    urlFields: ['telegramUrl', 'twitterUrl', 'earnUrl'],
    enumFields: {},
    arrayFields: [],
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isValidUrl(value) {
  return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
}

function parseFrontmatter(content) {
  const lines = content.split('\n');
  if (lines[0].trim() !== '---') return { data: {}, body: content };

  const endIdx = lines.findIndex((l, i) => i > 0 && l.trim() === '---');
  if (endIdx === -1) return { data: {}, body: content };

  const fmLines = lines.slice(1, endIdx);
  const data = {};

  for (const line of fmLines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1);
      if (inner.trim() === '') {
        data[key] = [];
      } else {
        data[key] = inner.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
      }
    } else if (value === 'true') {
      data[key] = true;
    } else if (value === 'false') {
      data[key] = false;
    } else {
      data[key] = value;
    }
  }

  return { data, body: lines.slice(endIdx + 1).join('\n') };
}

function validateData(data, schema, memberSlugs = null) {
  const errors = [];
  const warnings = [];

  for (const field of schema.required || []) {
    const val = data[field];
    if (val === undefined || val === null || val === '') {
      errors.push(`missing required field: ${field}`);
    }
  }

  for (const field of schema.urlFields || []) {
    const val = data[field];
    if (val !== undefined && val !== null && val !== '') {
      if (!isValidUrl(val)) {
        warnings.push(`${field}: not a valid URL (must start with http:// or https://)`);
      }
    }
  }

  for (const [field, allowed] of Object.entries(schema.enumFields || {})) {
    const val = data[field];
    if (val !== undefined && val !== null && val !== '') {
      if (!allowed.includes(val)) {
        warnings.push(`${field}: "${val}" is not an allowed value (allowed: ${allowed.join(', ')})`);
      }
    }
  }

  for (const [field, allowed] of Object.entries(schema.enumArrayFields || {})) {
    const val = data[field];
    if (Array.isArray(val)) {
      for (const item of val) {
        if (!allowed.includes(item)) {
          warnings.push(`${field}: "${item}" is not an allowed value (allowed: ${allowed.join(', ')})`);
        }
      }
    }
  }

  if (memberSlugs) {
    if (data.authorSlug && !memberSlugs.has(data.authorSlug)) {
      warnings.push(`authorSlug: "${data.authorSlug}" does not match any member slug`);
    }
    if (Array.isArray(data.authorSlugs)) {
      for (const slug of data.authorSlugs) {
        if (!memberSlugs.has(slug)) {
          warnings.push(`authorSlugs: "${slug}" does not match any member slug`);
        }
      }
    }
  }

  return { errors, warnings };
}

// ─── Schema detection ─────────────────────────────────────────────────────────

function detectSchema(filePath) {
  const rel = filePath.replace(/\\/g, '/');
  if (rel.includes('content/members/')) return 'member';
  if (rel.includes('content/events/')) return 'event';
  if (rel.includes('content/projects/')) return 'project';
  if (rel.includes('content/partners/')) return 'partner';
  if (rel.includes('content/posts/')) return 'post';
  if (rel.endsWith('site-config.json')) return 'site-config';
  return null;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function run() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Usage: node scripts/validate-content-single.mjs <file>');
    console.error('Example: node scripts/validate-content-single.mjs content/members/new-member.json');
    process.exit(1);
  }

  const absFile = path.isAbsolute(arg) ? arg : path.resolve(ROOT, arg);
  const rel = path.relative(ROOT, absFile);

  if (!fs.existsSync(absFile)) {
    console.error(`❌ File not found: ${rel}`);
    process.exit(1);
  }

  const schemaKey = detectSchema(absFile);
  if (!schemaKey) {
    console.error(`❌ Cannot determine content type for: ${rel}`);
    console.error('   File must be under content/members/, content/events/, content/projects/,');
    console.error('   content/partners/, content/posts/, or be content/site-config.json');
    process.exit(1);
  }

  const schema = SCHEMAS[schemaKey];

  // Collect member slugs for cross-ref checks
  const membersDir = path.join(ROOT, 'content', 'members');
  let memberSlugs = null;
  if (['project', 'post'].includes(schemaKey) && fs.existsSync(membersDir)) {
    memberSlugs = new Set(
      fs.readdirSync(membersDir)
        .filter(f => f.endsWith('.json'))
        .map(f => path.basename(f, '.json'))
    );
  }

  let errors = [];
  let warnings = [];

  const isMdoc = absFile.endsWith('.mdoc');

  if (isMdoc) {
    // Check subdirectory
    const postsDir = path.join(ROOT, 'content', 'posts');
    const fileDir = path.dirname(absFile);
    if (fileDir !== postsDir) {
      errors.push('file is inside a subdirectory — .mdoc posts must be flat files directly in content/posts/');
    } else {
      try {
        const content = fs.readFileSync(absFile, 'utf8');
        const { data } = parseFrontmatter(content);
        ({ errors, warnings } = validateData(data, schema, memberSlugs));
      } catch (e) {
        errors.push(`could not read file: ${e.message}`);
      }
    }
  } else {
    try {
      const data = JSON.parse(fs.readFileSync(absFile, 'utf8'));
      ({ errors, warnings } = validateData(data, schema, memberSlugs));
    } catch (e) {
      errors.push(`invalid JSON: ${e.message}`);
    }
  }

  console.log('');
  if (errors.length > 0) {
    console.log(`❌ ${rel} — ${errors.join('; ')}`);
    for (const w of warnings) {
      console.log(`   ⚠️  ${w}`);
    }
    console.log('');
    process.exit(1);
  } else if (warnings.length > 0) {
    console.log(`⚠️  ${rel} — ${warnings.join('; ')}`);
    console.log('');
    process.exit(0);
  } else {
    console.log(`✅ ${rel} — OK`);
    console.log('');
    process.exit(0);
  }
}

run();
