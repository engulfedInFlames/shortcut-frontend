const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PugPlugin = require("pug-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    index: "./views/pages/index.pug",
    report: "./views/pages/report.pug",
    signup: "./views/pages/signup.pug",
    colloquium: "./views/pages/colloquium.pug",
    consortium: "./views/pages/consortium.pug",
    insight: "./views/pages/insight.pug",
    write: "./views/pages/write.pug",
    updateMe: "./views/pages/me-update.pug",
    me: "./views/pages/me.pug",
    error: "./views/error.pug",
    main: "./public/javascripts/main.js",
    api: "./public/javascripts/api.js",
    bootstrapBundleJS: "./public/javascripts/bootstrap/index.esm.js",
    style: "./public/stylesheets/style.css",
    font1: "./public/stylesheets/fonts/bootstrap-icons.woff",
    font2: "./public/stylesheets/fonts/bootstrap-icons.woff2",
    //☝🏽 Insert your PUG HTML files here
  },
  output: {
    path: path.join(__dirname, "dist/"),
    publicPath: "/",
    filename: "assets/javascripts/[name].[contenthash:8].js",
    //☝🏽 Output filename of files with hash for unique id
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./views/pages/index.pug",
      filename: "index.html",
      chunks: ["main", "api", "index"],
    }),
    new HtmlWebpackPlugin({
      template: "./views/pages/report.pug",
      filename: "report.html",
      chunks: ["main", "api", "report"],
    }),
    new HtmlWebpackPlugin({
      template: "./views/pages/signup.pug",
      filename: "signup.html",
      chunks: ["main", "api", "signup"],
    }),
    new HtmlWebpackPlugin({
      template: "./views/pages/colloquium.pug",
      filename: "colloquium.html",
      chunks: ["main", "api", "colloquium"],
    }),
    new HtmlWebpackPlugin({
      template: "./views/pages/consortium.pug",
      filename: "consortium.html",
      chunks: ["main", "api", "consortium"],
    }),
    new HtmlWebpackPlugin({
      template: "./views/pages/insight.pug",
      filename: "insight.html",
      chunks: ["main", "api", "insight"],
    }),
    new HtmlWebpackPlugin({
      template: "./views/pages/write.pug",
      filename: "write.html",
      chunks: ["main", "api", "write"],
    }),
    new HtmlWebpackPlugin({
      template: "./views/pages/me-update.pug",
      filename: "me-update.html",
      chunks: ["main", "api", "updateMe"],
    }),
    new HtmlWebpackPlugin({
      template: "./views/pages/me.pug",
      filename: "me.html",
      chunks: ["main", "api", "me"],
    }),
    new HtmlWebpackPlugin({
      template: "./views/error.pug",
      filename: "error.html",
      chunks: ["error"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
        //☝🏽 Load Pug files
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("node-sass"),
            },
          },
        ],
        //☝🏽 Load Sass files
      },
      {
        // To use images on pug files:
        test: /\.(png|jpg|jpeg|ico)/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name].[hash:8][ext]",
        },
      },
      {
        // To use fonts on pug files:
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/stylesheets/fonts/[name][ext][query]",
        },
      },
    ],
  },
  target: "node",
  externalsPresets: {
    node: true,
  },
  externals: [nodeExternals()],

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    watchFiles: {
      paths: ["./views/**/*.*", "./scss/**/*.*"],
      //☝🏽 Enables HMR in these folders
      options: {
        usePolling: true,
      },
    },
  },
  stats: "errors-only",
  //☝🏽 For a cleaner dev-server run
};
