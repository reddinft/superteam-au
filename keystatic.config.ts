import { config, collection, singleton, fields } from '@keystatic/core'

export default config({
  storage: {
    kind: process.env.KEYSTATIC_STORAGE_KIND === 'github' ? 'github' : 'local',
    ...(process.env.KEYSTATIC_STORAGE_KIND === 'github' && {
      repo: {
        owner: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER!,
        name: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME!,
      },
    }),
  } as any,

  collections: {
    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'content/events/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        endDate: fields.date({ label: 'End Date' }),
        location: fields.text({ label: 'Location' }),
        locationUrl: fields.url({ label: 'Location URL' }),
        type: fields.select({
          label: 'Event Type',
          options: [
            { label: 'Hackathon', value: 'hackathon' },
            { label: 'Builder Session', value: 'builder-session' },
            { label: 'Networking', value: 'networking' },
            { label: 'Summit', value: 'summit' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'networking',
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        rsvpUrl: fields.url({ label: 'RSVP URL' }),
        recapUrl: fields.url({ label: 'Recap URL (for past events)' }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/events/',
          publicPath: '/images/events/',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
      },
    }),

    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'content/projects/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'DeFi', value: 'defi' },
            { label: 'DePIN', value: 'depin' },
            { label: 'Gaming', value: 'gaming' },
            { label: 'NFT', value: 'nft' },
            { label: 'Infrastructure', value: 'infra' },
            { label: 'DAO', value: 'dao' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'other',
        }),
        url: fields.url({ label: 'Project URL' }),
        githubUrl: fields.url({ label: 'GitHub URL' }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/projects/',
          publicPath: '/images/projects/',
        }),
        authorSlugs: fields.array(fields.text({ label: 'Author Slug' }), {
          label: 'Author Slugs',
          itemLabel: (props) => props.value,
        }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
      },
    }),

    members: collection({
      label: 'Members',
      slugField: 'name',
      path: 'content/members/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role' }),
        guild: fields.select({
          label: 'Guild',
          options: [
            { label: 'Dev', value: 'dev' },
            { label: 'Design', value: 'design' },
            { label: 'Writers', value: 'writers' },
            { label: 'Ops', value: 'ops' },
          ],
          defaultValue: 'dev',
        }),
        city: fields.select({
          label: 'City',
          options: [
            { label: 'Sydney', value: 'sydney' },
            { label: 'Melbourne', value: 'melbourne' },
            { label: 'Brisbane', value: 'brisbane' },
            { label: 'Perth', value: 'perth' },
            { label: 'Adelaide', value: 'adelaide' },
            { label: 'Remote', value: 'remote' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'sydney',
        }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'public/images/members/',
          publicPath: '/images/members/',
        }),
        twitterUrl: fields.url({ label: 'Twitter / X URL' }),
        githubUrl: fields.url({ label: 'GitHub URL' }),
        linkedinUrl: fields.url({ label: 'LinkedIn URL' }),
        websiteUrl: fields.url({ label: 'Website URL' }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
      },
    }),

    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedAt: fields.date({ label: 'Published At', validation: { isRequired: true } }),
        authorSlug: fields.text({ label: 'Author Slug' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Ecosystem Update', value: 'ecosystem-update' },
            { label: 'Member Story', value: 'member-story' },
            { label: 'Event Recap', value: 'event-recap' },
            { label: 'Tutorial', value: 'tutorial' },
            { label: 'Announcement', value: 'announcement' },
          ],
          defaultValue: 'ecosystem-update',
        }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/posts/',
          publicPath: '/images/posts/',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        body: fields.document({
          label: 'Body',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),

    partners: collection({
      label: 'Partners',
      slugField: 'name',
      path: 'content/partners/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        logo: fields.image({
          label: 'Logo',
          directory: 'public/images/partners/',
          publicPath: '/images/partners/',
        }),
        url: fields.url({ label: 'Website URL' }),
        tier: fields.select({
          label: 'Tier',
          options: [
            { label: 'Platinum', value: 'platinum' },
            { label: 'Gold', value: 'gold' },
            { label: 'Community', value: 'community' },
          ],
          defaultValue: 'community',
        }),
        order: fields.integer({ label: 'Display Order', defaultValue: 99 }),
      },
    }),
  },

  singletons: {
    siteConfig: singleton({
      label: 'Site Config',
      path: 'content/site-config',
      format: { data: 'json' },
      schema: {
        heroHeadline: fields.text({ label: 'Hero Headline' }),
        heroSubheadline: fields.text({ label: 'Hero Subheadline', multiline: true }),
        membersCount: fields.integer({ label: 'Members Count', defaultValue: 0 }),
        eventsCount: fields.integer({ label: 'Events Count', defaultValue: 0 }),
        projectsCount: fields.integer({ label: 'Projects Count', defaultValue: 0 }),
        totalEarned: fields.text({ label: 'Total Earned (e.g. $50K+)' }),
        discordUrl: fields.url({ label: 'Discord URL' }),
        twitterUrl: fields.url({ label: 'Twitter URL' }),
        earnUrl: fields.url({ label: 'Earn URL' }),
        contactEmail: fields.text({ label: 'Contact Email' }),
      },
    }),
  },
})
