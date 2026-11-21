// Bundles a deck into one self-contained HTML file that students can open
// with a double click - no web server, no installation, no internet needed.
//
//     npm run build:standalone                  ->  slides.html
//     npm run build:standalone -- lecture-3.md  ->  lecture-3.html

import { spawnSync } from 'node:child_process'
import { copyFileSync, rmSync, statSync } from 'node:fs'
import { basename } from 'node:path'

const entry = process.argv[2] ?? 'slides.md'
const output = `${basename(entry, '.md')}.html`
const buildDir = '.standalone'

// - STANDALONE switches on the single-file bundling in vite.config.ts
// - a file opened from disk has no server that could resolve paths like /3,
//   so the slide number goes into the hash (slides.html#/3)
const { status } = spawnSync(
  'npx',
  ['slidev', 'build', entry, '--router-mode', 'hash', '--base', './', '--out', buildDir],
  { stdio: 'inherit', shell: true, env: { ...process.env, STANDALONE: '1' } },
)
if (status !== 0)
  process.exit(status ?? 1)

copyFileSync(`${buildDir}/index.html`, output)
rmSync(buildDir, { recursive: true })

console.log(`\n  ${output}  (${(statSync(output).size / 1e6).toFixed(1)} MB)\n`)
