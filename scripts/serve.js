/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn } = require('child_process');
const path = require('path');
const esBuild = require('esbuild');
const vueService = require('@vue/cli-service');
const { info, error } = require('@vue/cli-shared-utils');
const fsExtra = require('fs-extra')

const projectDir = process.cwd();
const service = new vueService(projectDir);

function serveDev() {
  service.init("development");
  service.run('serve').then(() => {
    info('Building main...');

    const mainBuild = buildNodeFile('src/main/main.ts', 'intermediate/main.js');
    const preloadBuild = buildNodeFile('src/main/preload.ts', 'intermediate/preload.js');

    Promise.all([mainBuild, preloadBuild])
      .then(() => {
        fsExtra.copySync(projectDir + '/src/splash', projectDir + '/intermediate/splash');
        startElectron();
      })
      .catch((e) => {
        error('Could not compile main');
        error(e);
        process.exit(1);
      })
  }).catch((err) => {
    error(err.stack);
  });
}

serveDev();


function startElectron() {
  info('Launching Electron...');

  const p = spawn(
    path.join(
      projectDir,
      'node_modules',
      '.bin',
      process.platform === 'win32' ? 'electron.cmd' : 'electron'
    ),
    ['intermediate/main.js'],
    { stdio: 'inherit' }
  );

  p.on('exit', () => {
    process.exit(0);
  });
}

function buildNodeFile(file, out) {
  return esBuild.build({
    entryPoints: [file],
    bundle: true,
    outfile: out,
    platform: 'node',
    target: 'node14.16',
    external: ['electron', 'chokidar']
  })
}