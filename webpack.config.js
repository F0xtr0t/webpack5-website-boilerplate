const webpack = require('webpack');
const path = require('path');
const env = process.argv[2] === '--mode=development' ? 'development' : 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin  = require('webpack-remove-empty-scripts');
const CopyPlugin = require("copy-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = (e, args) => {
  const plugins = [];
  const entryDir = './src/'; // Entries directory
  const outputDir = './dist/'; // outputs directory

  // Prevent empty js file from .scss entries
  plugins.push(
      new RemoveEmptyScriptsPlugin()
  );

  // Extract css from js to simple css file
  plugins.push(
    new MiniCssExtractPlugin({
      filename: env === 'production' ? "css/main.[contenthash].css" : "css/main.css",
      chunkFilename: env === 'production' ? "css/chunk.[name].[contenthash].css" : "css/chunk.[name].dev.css"
    })
  );

  // Copy fonts & images from src directory to assets directory
  plugins.push(
      new CopyPlugin({
        patterns: [
          { from: path.join(__dirname, entryDir + 'images'), to: path.join(__dirname, outputDir + 'images'), force: true, noErrorOnMissing: true},
          { from: path.join(__dirname, entryDir + 'fonts'), to: path.join(__dirname, outputDir + 'fonts'), force: true, noErrorOnMissing: true }
        ]
      })
  );

  // Webpack progress bar (default)
  plugins.push(
      new webpack.ProgressPlugin({
        activeModules: false,
        entries: false,
        modules: false,
        percentBy: 'entries',
        handler(percentage, message, ...args) {
          if(message !== "cache") {
            if(percentage === 1) {
              let date = new Date();
              let hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
              let minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
              let seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
              console.log("["+hour+":"+minutes+":"+seconds+"] Done !");
            } else {
              console.info((percentage * 100) + '%', message);
            }
          }
        }
      })
  )

  // Webpack manifest.json generator
  plugins.push(
      new WebpackManifestPlugin({
        publicPath: outputDir
      })
  )

  // Define rules for scss compilation
  const ruleScss = {
    test: /\.sc|ass$/,
    exclude: /node_modules/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      { loader: "css-loader",
        options: {
          importLoaders: 1,
          url: false
        }
      },
      { loader: 'postcss-loader' }, // See config in postcss.config.js at the root of the project
      {
        loader: "sass-loader",
        options: {
          sourceMap: true
        }
      }
    ]
  }

  // Define rules for js compilation
  const ruleJs = {
    test: /\.js$/,
    exclude: [
      /node_modules/
    ],
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            "@babel/preset-env",
            {
              "useBuiltIns": "entry",
              "debug": args.mode !== 'production',
              "corejs": 3,
              "exclude": ["proposal-dynamic-import"],
            }
          ]
        ]
      }
    }
  }

  return {
    mode: args.mode,
    devtool: args.mode === 'production' ? false : 'source-map',
    entry: [
      path.join(__dirname, entryDir + 'js/main.js'),
      path.join(__dirname, entryDir + 'css/main.scss')
    ],
    output: {
      path: path.join(__dirname, outputDir),
      filename: args.mode === 'production' ? 'js/main.[contenthash].js' : 'js/main.js',
      chunkFilename: args.mode === 'production' ? 'js/modules/[name].[contenthash].js' : 'js/modules/dev.[name].js',
      clean: {
        dry: false, // Set to true for "simulate" delete
        keep: /(images|fonts|js\/main.js|css\/main.css|js\/modules\/dev\.(.*)\.js)/
      }
    },
    module: {
      rules: [ruleScss, ruleJs]
    },
    plugins: plugins
  }
}
