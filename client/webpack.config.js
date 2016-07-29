/**
 * Webpack Configuration
 * http://webpack.github.io/docs/configuration.html
 */
var path = require("path");
var webpack = require("webpack");

var AUTOPREFIXER_BROWSERS = ["last 2 version"];

module.exports = {
  // Entry point(s) for the bundle
  entry: [
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/dev-server",
    "./src/index.jsx"
  ],

  output: {
    path: "/",
    filename: "app.js"
  },

  // Loaders
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "react-hot!babel"
      },
      {
        test: /\.(css|styl)$/,
        loader: "style!" +
                "css!" +
                "autoprefixer?{browsers:" + JSON.stringify(AUTOPREFIXER_BROWSERS) + "}!" +
                "stylus-loader?paths=" +
                path.resolve(__dirname, "node_modules/bootstrap-styl")
      },
      {
        test: /\.(json)$/,
        loader: "json"
      },
      {
        test: /\.(gif|png|jpg|svg|eot|woff2|ttf|woff)(\?|$)/,
        loader: "url?limit=8192"
      }
    ]
  },

  // Path resolving, aliases
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      components: path.resolve(__dirname, "src/components"),
      utils: path.resolve(__dirname, "src/utils"),
      styles: path.resolve(__dirname, "src/styles")
    }
  },

  // Dev server configuration
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    host: "localhost",
    port: process.env.PORT || 3000,
    contentBase: "./src"
  },

  // Plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  // General configuration
  debug: true,
  devtool: "eval"
};
