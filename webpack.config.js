const { readFileSync } = require('fs');
const { resolve } = require('path');

const rxPaths = require('rxjs/_esm5/path-mapping');

const {
  BannerPlugin,
  EnvironmentPlugin,
} = require('webpack');

const merge = require('webpack-merge');
const { argv: { mode } } = require('yargs');

const { name: filename, version } = require('./package.json');

const banner = readFileSync(resolve('./_includes/header.txt'), 'utf-8');

const flatten = [(a, x) => a.concat(x), []];

function envConfig() {
  switch (mode) {
    case 'production':
      return {
        plugins: [
          new BannerPlugin({ banner, raw: true }),
          new EnvironmentPlugin({ DEBUG: false }),
        ],
      };

    default:
      return {
        devtool: 'source-map',
        plugins: [new EnvironmentPlugin({ DEBUG: true })],
      };
  }
}

module.exports = merge(
  {
    entry: resolve('./_js/src/index.js'),
    output: {
      path: resolve('./assets/js'),
      filename: `${filename}-${version}.js`,
    },
    module: {
      rules: [
        {
          test: /(\.jsx|\.js)$/,
          loader: 'babel-loader',
          options: {
            presets: [['env', { modules: false }]],
            babelrc: false,
          },
        },
      ],
    },
    resolve: {
      modules: [
        resolve('./_js'),
        resolve('./node_modules'),
        process.env.NODE_PATH ? resolve(process.env.NODE_PATH) : [],
      ].reduce(...flatten),
      extensions: ['.json', '.js'],
      symlinks: true,
      alias: rxPaths(),
    },
  },
  envConfig()
);
