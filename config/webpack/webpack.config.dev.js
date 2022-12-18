/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const { merge } = require("webpack-merge");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ignoredFiles = require("react-dev-utils/ignoredFiles");
const evalSourceMapMiddleware = require("react-dev-utils/evalSourceMapMiddleware");
const redirectServedPath = require("react-dev-utils/redirectServedPathMiddleware");
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware");

process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const host = process.env.HOST || "0.0.0.0";
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/ws'
const sockPort = process.env.WDS_SOCKET_PORT;

const paths = require("../paths");
const config = require("./webpack.config.js");

/**
 * @type import('webpack').Configuration
 */
const devConfig = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    // writeToDisk: true,
    allowedHosts: "all",
    client: {
      webSocketURL: {
        // Enable custom sockjs pathname for websocket connection to hot reloading server.
        // Enable custom sockjs hostname, pathname and port for websocket connection
        // to hot reloading server.
        hostname: sockHost,
        pathname: sockPath,
        port: sockPort,
      },
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    },
    compress: true,
    static: {
      directory: paths.appPublic,
      publicPath: [paths.publicUrlOrPath],
      watch: {
        ignored: ignoredFiles(paths.appSrc),
      },
    },
    // https: getHttpsConfig(),
    // proxy: {
    //   "/ws": {
    //     target: "http://localhost:443",
    //     changeOrigin: true,
    //     secure: true,
    //   },
    // },
    devMiddleware: {
      publicPath: paths.publicUrlOrPath.slice(0, -1),
    },
    host,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebook/create-react-app/issues/387.
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
    onBeforeSetupMiddleware(devServer) {
      // Keep `evalSourceMapMiddleware`
      // middlewares before `redirectServedPath` otherwise will not have any effect
      // This lets us fetch source contents from webpack for the error overlay
      devServer.app.use(evalSourceMapMiddleware(devServer));

      if (fs.existsSync(paths.proxySetup)) {
        // This registers user provided middleware for proxy reasons
        require(paths.proxySetup)(devServer.app);
      }
    },
    onAfterSetupMiddleware(devServer) {
      // Redirect to `PUBLIC_URL` or `homepage` from `package.json` if url not match
      devServer.app.use(redirectServedPath(paths.publicUrlOrPath));

      // This service worker file is effectively a 'no-op' that will reset any
      // previous service worker registered for the same host:port combination.
      // We do this in development to avoid hitting the production cache if
      // it used the same host and port.
      // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
      devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    new CaseSensitivePathsPlugin(),
  ],
};

module.exports = merge(config, devConfig);
