const CopyPlugin = require('copy-webpack-plugin');
const DevMode = process.env.NODE_ENV !== 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Path = require('path');
const SassPlugin = require('sass-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
     app: ['./src/js/index.js', './src/style/marco.scss','./node_modules/axe-core/axe.min.js']
  },
  output: {
    filename: "js/mr.js",
  },
  devServer: {
     contentBase: './dist',
     port: 8080,
     watchContentBase: true,
     open: true,
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        options: {
        fix: "true"
        },
        exclude: /node_modules/,
        loader: "eslint-loader"
        },
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   loader: "babel-loader"
        // },
        {
          test: /\.js$|\.jsx$/,
          use: {
            loader: 'istanbul-instrumenter-loader',
            options: { esModules: true }
          },
          enforce: 'post',
          exclude: /node_modules|\.spec\.js$/,
        },
        // {
        //     test: /\.js$/,
        //     use: {
        //       loader: 'istanbul-instrumenter-loader',
        //       options: {...options}
        //     }
        // },
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   loader: "eslint-loader",
        //   options: {
        //     fix: "true"
        //   },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          DevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new SassPlugin({'./src/style/marco.scss': 'css/mr.css'}, {
      sourceMap: false,
      sass: { outputStyle: 'compressed' },
      autoprefixer: false
    }, process.env.NODE_ENV),
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/mr.css'
    }),
    new CopyPlugin([
      {from: 'src/index.html'},
      {from: 'src/img', to :'img'},
      {from: 'src/data', to :'data'},
      {from: 'src/fonts', to :'fonts'}
  ]),
  ]
};
