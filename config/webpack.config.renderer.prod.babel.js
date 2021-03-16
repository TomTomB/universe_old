import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CheckNodeEnv from '../scripts/CheckNodeEnv';
import CopyPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import DeleteSourceMaps from '../scripts/DeleteSourceMaps';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import baseConfig from './webpack.config.base';
import { merge } from 'webpack-merge';
import path from 'path';
import webpack from 'webpack';

CheckNodeEnv('production');
DeleteSourceMaps();

const devtoolsConfig =
  process.env.DEBUG_PROD === 'true'
    ? {
        devtool: 'source-map',
      }
    : {};

export default merge(baseConfig, {
  ...devtoolsConfig,

  mode: 'production',

  target: 'electron-renderer',

  entry: [
    'core-js',
    'regenerator-runtime/runtime',
    path.join(__dirname, '../src/renderer/index.tsx'),
  ],

  output: {
    path: path.join(__dirname, '../intermediate/dist'),
    publicPath: './',
    filename: 'renderer.js',
  },

  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(webm|ogg)$/i,
        type: 'asset/resource',
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
    }),

    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),

    new BundleAnalyzerPlugin({
      analyzerMode:
        process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
      openAnalyzer: process.env.OPEN_ANALYZER === 'true',
    }),

    new HtmlWebpackPlugin({
      template: './src/renderer/index.ejs',
      title: 'Universe',
    }),

    new CopyPlugin({
      patterns: [
        {
          from: './src/splash',
          to: path.join(__dirname, '../intermediate/splash'),
        },
      ],
    }),
  ],
});
