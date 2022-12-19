/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const { merge } = require("webpack-merge");
const {
  prepareProxy,
  prepareUrls,
} = require("react-dev-utils/WebpackDevServerUtils");
const chalk = require("react-dev-utils/chalk");
const ignoredFiles = require("react-dev-utils/ignoredFiles");
const evalSourceMapMiddleware = require("react-dev-utils/evalSourceMapMiddleware");
const redirectServedPath = require("react-dev-utils/redirectServedPathMiddleware");
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const paths = require("../paths");
const config = require("./webpack.config.js");

const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/ws'
const sockPort = process.env.WDS_SOCKET_PORT;

const host = process.env.HOST || "0.0.0.0";
const port = parseInt(process.env.PORT, 10) || 3000;
const protocol = process.env.HTTPS === "true" ? "https" : "http";

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  );
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  );
  console.log(
    `Learn more here: ${chalk.yellow("https://cra.link/advanced-config")}`
  );
  console.log();
}

const urls = prepareUrls(
  protocol,
  host,
  port,
  paths.publicUrlOrPath.slice(0, -1)
);
const proxySetting = require(paths.appPackageJson).proxy;
const proxy = prepareProxy(
  proxySetting,
  paths.appPublic,
  paths.publicUrlOrPath
);

/**
 * @type import('webpack').Configuration
 */
const devConfig = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    open: true,
    hot: true,
    allowedHosts: urls.lanUrlForConfig,
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
    host,
    proxy,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebook/create-react-app/issues/387.
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
    devMiddleware: {
      publicPath: paths.publicUrlOrPath.slice(0, -1),
    },
    setupMiddlewares: (middlewares, devServer) => {
      middlewares.unshift({
        name: "first-in-array",
        middleware: () => {
          // Keep `evalSourceMapMiddleware`
          // middlewares before `redirectServedPath` otherwise will not have any effect
          // This lets us fetch source contents from webpack for the error overlay
          devServer.app.use(evalSourceMapMiddleware(devServer));

          if (fs.existsSync(paths.proxySetup)) {
            // This registers user provided middleware for proxy reasons
            require(paths.proxySetup)(devServer.app);
          }
        },
      });

      middlewares.push({
        name: "hello-world-test-one",
        middleware: () => {
          devServer.app.use(redirectServedPath(paths.publicUrlOrPath));
          devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
        },
      });

      return middlewares;
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin({
      // overlay: true,
    }),
    new CaseSensitivePathsPlugin(),
  ],
};

module.exports = merge(config, devConfig);
