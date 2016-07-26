/**
 * Webpack Configuration
 * http://webpack.github.io/docs/configuration.html
 */
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Entry point(s) for the bundle
  entry: ["./src/index.js"],

  // Output
  output: {
    path: path.resolve(__dirname, "public/assets"),
    publicPath: "/assets/",
    filename: "main.js"
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
                "autoprefixer!" +
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

  // Plugins
  plugins: [
    new ExtractTextPlugin("main.css"),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "../index.html",
      inject: true,
      minify: true,
      hash: true
    })
  ],

  // Path resolving, aliases
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      components: path.resolve(__dirname, "src/components"),
      utils: path.resolve(__dirname, "src/utils"),
      styles: path.resolve(__dirname, "src/styles")
    }
  },
  devtool: "source-map"
};
