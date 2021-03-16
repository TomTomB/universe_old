import CheckNodeEnv from '../scripts/CheckNodeEnv';
import baseConfig from './webpack.config.base';
import { dependencies } from '../package.json';
import { merge } from 'webpack-merge';
import path from 'path';
import webpack from 'webpack';

CheckNodeEnv('development');

const dllPath = path.join(__dirname, '../intermediate/dll');

export default merge(baseConfig, {
  context: path.join(__dirname, '../'),

  devtool: 'eval',

  mode: 'development',

  target: 'electron-renderer',

  externals: ['fsevents', 'crypto-browserify'],

  module: require('./webpack.config.renderer.dev.babel').default.module,

  entry: {
    renderer: Object.keys(dependencies || {}),
  },

  output: {
    library: 'renderer',
    path: dllPath,
    filename: '[name].dll.js',
    libraryTarget: 'var',
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(dllPath, '[name].json'),
      name: '[name]',
    }),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: path.join(__dirname, '../src/renderer'),
        output: {
          path: path.join(__dirname, '../intermediate/dist'),
        },
      },
    }),
  ],
});
