const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "index.[hash].js",
    path: __dirname + "/dist"
  },
  devtool: "source-map",
  devServer: {
    host: "0.0.0.0",
    contentBase: "./dist",
    compress: true,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    }
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader",
        options: {
          publicPath: "/"
        }
      },
      {
        test: /\.tsx?$/,
        loaders: ["babel-loader", "awesome-typescript-loader"]
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Anka",
      template: "./src/index.html"
    })
  ]
};
