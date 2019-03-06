const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge.smart(common, {
  mode: 'production',
  entry: "./src/Widget/Widget.js",
  output: {
    path: path.join(__dirname, "/dist"),
    library: '',
    libraryTarget: 'commonjs',
    //libraryExport: 'Widget',
    filename: 'widget.js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "social-widget.css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  }
});