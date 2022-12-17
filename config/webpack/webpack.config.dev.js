/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { merge } = require("webpack-merge");

const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const paths = require("../paths");
const config = require("./webpack.config.js");

module.exports = merge(config, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    writeToDisk: true,
    client: {
      webSocketURL: "ws://0.0.0.0/ws",
    },
    proxy: {
      "/ws": {
        target: "http://localhost:443",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  output: {
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    new CaseSensitivePathsPlugin(),
    new WebpackManifestPlugin({
      fileName: "asset-manifest.json",
      publicPath: paths.publicUrlOrPath,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter(
          (fileName) => !fileName.endsWith(".map")
        );

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    }),
  ],
});
