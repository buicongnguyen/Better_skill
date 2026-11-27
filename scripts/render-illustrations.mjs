import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const flag = process.argv.indexOf('--blender');
// Pinned: Blender 5.2.5 LTS from the machine's shared install (one copy for all repos).
const executable = flag >= 0 ? process.argv[flag + 1] : process.env.BLENDER_BIN ??
  'C:/tools/blender/blender-5.2.5-windows-x64/blender.exe';
if (!executable || !existsSync(executable)) throw new Error('Pass --blender <executable> or set BLENDER_BIN to Blender 5.2.5 LTS.');
const version = spawnSync(executable, ['--version'], {encoding:'utf8', windowsHide:true}).stdout ?? '';
if (!/^Blender 5\.2\.5\b/m.test(version)) throw new Error(`Need Blender 5.2.5 LTS at ${executable}, got "${version.split('\n')[0].trim()}".`);
const result = spawnSync(executable, ['--background', '--factory-startup', '--python-exit-code', '1',
  '--python', path.join(root, 'scripts/render-illustrations.py')], {cwd:root, stdio:'inherit', windowsHide:true});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
