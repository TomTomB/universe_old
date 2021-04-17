// eslint-disable-next-line @typescript-eslint/no-var-requires
require('esbuild').build({
  entryPoints: ['src/main/main.ts'],
  bundle: true,
  outfile: 'dist/main/main.js',
  platform: 'node',
  target: 'node14.16',
  minify: true,
  treeShaking: true,
  external: ['electron']
}).catch(() => process.exit(1))