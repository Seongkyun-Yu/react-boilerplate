// development config
import { merge } from "webpack-merge";
import { HotModuleReplacementPlugin } from "webpack";
import commonConfig from "./common";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

export default merge(commonConfig, {
  mode: "development",
  entry: [
    // 'react-hot-loader/patch', // activate HMR for React
    "webpack-dev-server/client?http://localhost:3000", // bundle the client for webpack-dev-server and connect to the provided endpoint
    "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
    "./index.tsx", // the entry point of our app
  ],
  devServer: {
    hot: true, // enable HMR on the server,

    // hotOnly : true,
    // open: true,
    port: 3000,
    host: "0.0.0.0",
    compress: true,
    // noInfo: true,
    stats: "minimal",
    inline: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    proxy: {},
    onListening: function (server) {
      const port = server.listeningApp.address().port;
      console.log("Listening on port:", port);
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "inline-source-map",
  plugins: [
    new HotModuleReplacementPlugin(), // enable HMR globally
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: "../tsconfig.json",
        memoryLimit: 8192,
      },
    }),
    // new HardSourceWebpackPlugin(),
  ],
});
