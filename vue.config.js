// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const ROOT = path.resolve(__dirname);

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  outputDir: 'intermediate/renderer',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  pages: {
    index: {
      entry: 'src/renderer/main.ts',
    }
  },
  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.ts'],
      alias: {
        '@universe/components': root('src/renderer/components'),
        '@universe/shared': root('src/shared'),
        '@universe/types': root('src/types'),
        '@universe/mocks': root('src/mocks'),
      },
    };
  }
}