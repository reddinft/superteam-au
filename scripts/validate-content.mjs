#!/usr/bin/env node
/**
 * validate-content.mjs
 * Validates all content files in content/ against the Keystatic schemas.
 * No external dependencies — uses only fs, path, url.
 *
 * Usage: node scripts/validate-content.mjs
 *        pnpm validate
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

/**
 * Parse frontmatter from a .mdoc file.
 * Returns { data, body } where data is a plain object of key: value pairs.
 */
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

    // Remove inline quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Handle arrays written as [a, b, c] or ["a", "b"]
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

/**
 * Validate a data object against a schema.
 * Returns { errors: string[], warnings: string[] }
 */
function validateData(data, schema, memberSlugs = null) {
  const errors = [];
  const warnings = [];

  // Required fields
  for (const field of schema.required || []) {
    const val = data[field];
    if (val === undefined || val === null || val === '') {
      errors.push(`missing required field: ${field}`);
    }
  }

  // URL fields
  for (const field of schema.urlFields || []) {
    const val = data[field];
    if (val !== undefined && val !== null && val !== '') {
      if (!isValidUrl(val)) {
        warnings.push(`${field}: not a valid URL (must start with http:// or https://)`);
      }
    }
  }

  // Enum fields
  for (const [field, allowed] of Object.entries(schema.enumFields || {})) {
    const val = data[field];
    if (val !== undefined && val !== null && val !== '') {
      if (!allowed.includes(val)) {
        warnings.push(`${field}: "${val}" is not an allowed value (allowed: ${allowed.join(', ')})`);
      }
    }
  }

  // Enum array fields (e.g. region)
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

  // authorSlug / authorSlugs cross-reference
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

// ─── File collection ──────────────────────────────────────────────────────────

function collectJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => path.join(dir, f));
}

function collectMdocFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Subdirectory — collect but mark as errors later
      const subDir = path.join(dir, entry.name);
      const nested = fs.readdirSync(subDir).filter(f => f.endsWith('.mdoc'));
      for (const f of nested) {
        results.push({ file: path.join(subDir, f), inSubdir: true });
      }
    } else if (entry.name.endsWith('.mdoc')) {
      results.push({ file: path.join(dir, entry.name), inSubdir: false });
    }
  }
  return results;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function run() {
  const results = []; // { file, status: 'ok'|'warn'|'error', messages: string[] }
  let hasErrors = false;

  // Collect member slugs first for cross-ref checks
  const membersDir = path.join(ROOT, 'content', 'members');
  const memberSlugs = new Set(
    collectJsonFiles(membersDir).map(f => path.basename(f, '.json'))
  );

  // ── members ──
  for (const file of collectJsonFiles(membersDir)) {
    const rel = path.relative(ROOT, file);
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      const { errors, warnings } = validateData(data, SCHEMAS.member);
      results.push({ file: rel, errors, warnings });
    } catch (e) {
      results.push({ file: rel, errors: [`invalid JSON: ${e.message}`], warnings: [] });
    }
  }

  // ── events ──
  const eventsDir = path.join(ROOT, 'content', 'events');
  for (const file of collectJsonFiles(eventsDir)) {
    const rel = path.relative(ROOT, file);
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      const { errors, warnings } = validateData(data, SCHEMAS.event);
      results.push({ file: rel, errors, warnings });
    } catch (e) {
      results.push({ file: rel, errors: [`invalid JSON: ${e.message}`], warnings: [] });
    }
  }

  // ── projects ──
  const projectsDir = path.join(ROOT, 'content', 'projects');
  for (const file of collectJsonFiles(projectsDir)) {
    const rel = path.relative(ROOT, file);
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      const { errors, warnings } = validateData(data, SCHEMAS.project, memberSlugs);
      results.push({ file: rel, errors, warnings });
    } catch (e) {
      results.push({ file: rel, errors: [`invalid JSON: ${e.message}`], warnings: [] });
    }
  }

  // ── partners ──
  const partnersDir = path.join(ROOT, 'content', 'partners');
  for (const file of collectJsonFiles(partnersDir)) {
    const rel = path.relative(ROOT, file);
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      const { errors, warnings } = validateData(data, SCHEMAS.partner);
      results.push({ file: rel, errors, warnings });
    } catch (e) {
      results.push({ file: rel, errors: [`invalid JSON: ${e.message}`], warnings: [] });
    }
  }

  // ── site-config ──
  const siteConfigFile = path.join(ROOT, 'content', 'site-config.json');
  {
    const rel = path.relative(ROOT, siteConfigFile);
    try {
      const data = JSON.parse(fs.readFileSync(siteConfigFile, 'utf8'));
      const { errors, warnings } = validateData(data, SCHEMAS['site-config']);
      results.push({ file: rel, errors, warnings });
    } catch (e) {
      results.push({ file: rel, errors: [`invalid JSON: ${e.message}`], warnings: [] });
    }
  }

  // ── posts (mdoc) ──
  const postsDir = path.join(ROOT, 'content', 'posts');
  for (const { file, inSubdir } of collectMdocFiles(postsDir)) {
    const rel = path.relative(ROOT, file);
    const fileErrors = [];
    const fileWarnings = [];

    if (inSubdir) {
      fileErrors.push('file is inside a subdirectory — .mdoc posts must be flat files directly in content/posts/');
      results.push({ file: rel, errors: fileErrors, warnings: fileWarnings });
      continue;
    }

    try {
      const content = fs.readFileSync(file, 'utf8');
      const { data } = parseFrontmatter(content);
      const { errors, warnings } = validateData(data, SCHEMAS.post, memberSlugs);
      results.push({ file: rel, errors, warnings });
    } catch (e) {
      results.push({ file: rel, errors: [`could not read file: ${e.message}`], warnings: [] });
    }
  }

  // ── Print results ──
  console.log('');
  for (const { file, errors, warnings } of results) {
    if (errors.length > 0) {
      hasErrors = true;
      console.log(`❌ ${file} — ${errors.join('; ')}`);
      for (const w of warnings) {
        console.log(`   ⚠️  ${w}`);
      }
    } else if (warnings.length > 0) {
      console.log(`⚠️  ${file} — ${warnings.join('; ')}`);
    } else {
      console.log(`✅ ${file} — OK`);
    }
  }

  const total = results.length;
  const errCount = results.filter(r => r.errors.length > 0).length;
  const warnCount = results.filter(r => r.errors.length === 0 && r.warnings.length > 0).length;
  const okCount = results.filter(r => r.errors.length === 0 && r.warnings.length === 0).length;

  console.log('');
  console.log(`── Summary: ${total} files — ✅ ${okCount} OK  ⚠️  ${warnCount} warnings  ❌ ${errCount} errors`);
  console.log('');

  process.exit(hasErrors ? 1 : 0);
}

run();
