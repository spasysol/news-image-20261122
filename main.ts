// News-image entry for make.fun's news-image-20261122 bounty.
//
// Copies the repository's entry.png — a front page summing up the world news
// of Sunday 22 November 2026 — to the output directory. No network, no clock,
// no randomness: two runs write the same bytes.

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));

/** --name <value> out of the arguments, or the fallback. */
function arg(name: string, fallback: string): string {
  const at = process.argv.indexOf(`--${name}`);
  if (at >= 0 && at + 1 < process.argv.length) return process.argv[at + 1]!;
  const withEquals = process.argv.find((a) => a.startsWith(`--${name}=`));
  return withEquals === undefined ? fallback : withEquals.slice(name.length + 3);
}

const out = arg('output', process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
const source = join(here, 'entry.png');

if (!existsSync(source)) {
  process.stderr.write('news image: entry.png is missing from the repository\n');
  process.exit(1);
}

mkdirSync(out, { recursive: true });
copyFileSync(source, join(out, 'entry.png'));
process.stdout.write('news image: wrote entry.png\n');
