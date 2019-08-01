const { readFileSync } = require("fs");
const { resolve } = require("path");

const rxPaths = require("rxjs/_esm5/path-mapping");

const { BannerPlugin, EnvironmentPlugin } = require("webpack");

const merge = require("webpack-merge");
const { argv: { mode } } = require("yargs");

const { name: filename, version } = require("./package.json");

const banner = readFileSync(resolve("./_includes/header.txt"), "utf-8");

const envConfig = (() => {
  switch (mode) {
    case "production":
      return {
        devtool: false,
        plugins: [new BannerPlugin({ banner, raw: true }), new EnvironmentPlugin({ DEBUG: false })],
      };

    default:
      return {
        devtool: "source-map",
        plugins: [new EnvironmentPlugin({ DEBUG: true })],
      };
  }
})()

const babelPresetLegacy = {
  babelrc: false,
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "entry",
        corejs: 2,
      },
    ],
  ],
}

const babelPresetModern = {
  babelrc: false,
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "entry",
        corejs: 2,
        targets: {
          esmodules: true,
        },
      },
    ],
  ],
}

const sharedConfig = {
  entry: resolve("./_js/src/entry.js"),
  output: {
    path: resolve("./assets/js"),
  },
  resolve: {
    modules: [
      resolve("./_js"),
      resolve("./node_modules"),
      ...process.env.NODE_PATH ? [resolve(process.env.NODE_PATH)] : [],
    ],
    extensions: [".json", ".js"],
    symlinks: true,
    alias: rxPaths(),
  },
}

module.exports = [
  merge(
    envConfig,
    sharedConfig,
    {
      output: {
        filename: `${filename}-${version}.js`,
      },
      module: {
        rules: [{
          test: /(\.jsx|\.js)$/,
          loader: "babel-loader",
          options: babelPresetModern,
        }, {
          test: /modernizr-custom/,
          use: 'null-loader'
        }, {
          test: /@webcomponents\/(template|url|webcomponents-platform)/,
          use: 'null-loader'
        }],
      },
    },
  ),
  merge(
    envConfig,
    sharedConfig,
    {
      output: {
        filename: `${filename}-legacy-${version}.js`,
      },
      module: {
        rules: [{
          test: /(\.jsx|\.js)$/,
          loader: "babel-loader",
          options: babelPresetLegacy,
        }],
      },
    },
  ),
];
