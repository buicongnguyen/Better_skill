import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const flag = process.argv.indexOf('--blender');
const executable = flag >= 0 ? process.argv[flag + 1] : process.env.BLENDER_BIN ??
  path.resolve(root, '../3d_astra/.tools/blender-4.5.3-windows-x64/blender.exe');
if (!executable || !existsSync(executable)) throw new Error('Pass --blender <executable> or set BLENDER_BIN to Blender 4.5 LTS.');
const result = spawnSync(executable, ['--background', '--factory-startup', '--python-exit-code', '1',
  '--python', path.join(root, 'scripts/render-illustrations.py')], {cwd:root, stdio:'inherit', windowsHide:true});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
