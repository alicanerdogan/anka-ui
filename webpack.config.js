const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "index.[hash].js",
    path: __dirname + "/dist",
    publicPath: "/"
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
        type: "javascript/auto",
        test: /\.(png|svg|jpg|gif|ico|xml|json)$/,
        include: [path.resolve(__dirname, "src/assets/icons")],
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]"
          }
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
      template: "./src/index.html",
      favicon: "./src/assets/icons/favicon.ico"
    })
  ]
};
