import { config } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER!,
      name: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME!,
    },
  },
  collections: {}, // Phase B will add collections
  singletons: {},
})
