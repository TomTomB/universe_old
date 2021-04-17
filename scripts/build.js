/* eslint-disable @typescript-eslint/no-var-requires */


const projectDir = process.cwd();

const esBuild = require('esbuild');
const vueService = require('@vue/cli-service');
const { info, error, done } = require('@vue/cli-shared-utils');
const fsExtra = require('fs-extra')

const service = new vueService(projectDir);

function buildProd() {
  service.init("production");

  fsExtra.removeSync(projectDir + '/intermediate')

  service.run('build').then(() => {
    info('Building main...');

    const mainBuild = buildNodeFile('src/main/main.ts', 'intermediate/main.js');
    const preloadBuild = buildNodeFile('src/main/preload.ts', 'intermediate/preload.js');

    Promise.all([mainBuild, preloadBuild])
      .then(() => {
        done('Build completed! \n');

        info('Copying dependencies...');

        fsExtra.copySync(projectDir + '/src/main/node_modules', projectDir + '/intermediate/node_modules');
        fsExtra.copySync(projectDir + '/src/main/package.json', projectDir + '/intermediate/package.json');
        fsExtra.copySync(projectDir + '/src/splash', projectDir + '/intermediate/splash');

        done('Copying completed!\n');
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

buildProd();


function buildNodeFile(file, out) {
  return esBuild.build({
    entryPoints: [file],
    bundle: true,
    outfile: out,
    platform: 'node',
    target: 'node14.16',
    treeShaking: true,
    minify: true,
    external: ['electron']
  })
}