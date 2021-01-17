import path from 'path';
import { execSync } from 'child_process';
import fs from 'fs';
import { dependencies } from '../src/main/package.json';

const nodeModulesPath = path.join(__dirname, '../src/main/node_modules');

if (
  Object.keys(dependencies || {}).length > 0 &&
  fs.existsSync(nodeModulesPath)
) {
  const electronRebuildCmd = `${path.join(
    __dirname,
    '../node_modules/.bin/electron-rebuild'
  )} --parallel --force --types prod,dev,optional --module-dir .`;
  const cmd =
    process.platform === 'win32'
      ? electronRebuildCmd.replace(/\//g, '\\')
      : electronRebuildCmd;
  execSync(cmd, {
    cwd: path.join(__dirname, '../src/main'),
    stdio: 'inherit',
  });
}
