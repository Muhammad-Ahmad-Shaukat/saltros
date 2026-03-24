import { spawnSync } from 'node:child_process'

const hasProjectId = Boolean(
  process.env.SANITY_STUDIO_PROJECT_ID ||
    process.env.SANITY_API_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
)
const hasDataset = Boolean(
  process.env.SANITY_STUDIO_DATASET ||
    process.env.SANITY_API_DATASET ||
    process.env.NEXT_PUBLIC_SANITY_DATASET
)
const hasAuthToken = Boolean(process.env.SANITY_AUTH_TOKEN)

if (!hasProjectId || !hasDataset) {
  console.log('[sanity] Skipping schema deploy: missing projectId or dataset env.')
  process.exit(0)
}

if (!hasAuthToken) {
  console.log('[sanity] Skipping schema deploy: SANITY_AUTH_TOKEN is not set.')
  process.exit(0)
}

console.log('[sanity] Deploying schema...')
const result = spawnSync('npx', ['sanity', 'schema', 'deploy', '--non-interactive'], {
  stdio: 'inherit',
  shell: true,
  env: process.env,
})

if (result.status !== 0) {
  process.exit(result.status ?? 1)
}

console.log('[sanity] Schema deploy complete.')
