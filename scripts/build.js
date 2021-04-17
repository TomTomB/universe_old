/* eslint-disable @typescript-eslint/no-var-requires */


const projectDir = process.cwd();

const esBuild = require('esbuild');
const vueService = require('@vue/cli-service');
const { info, error, done } = require('@vue/cli-shared-utils');



const service = new vueService(projectDir);

function buildProd() {
  service.init("production");
  service.run('build').then(() => {
    info('Building main...');

    const mainBuild = buildNodeFile('src/main/main.ts', 'intermediate/main.js');
    const preloadBuild = buildNodeFile('src/main/preload.ts', 'intermediate/preload.js');

    Promise.all([mainBuild, preloadBuild])
      .then(() =>
        done('Build completed!')
      )
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