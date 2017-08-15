const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const _ = require('lodash')

const NODE_ENV = process.env.NODE_ENV || 'development'
const FILESTACK_API_KEY = process.env.FILESTACK_API_KEY || 'A7sw4SbU4SmqGU42igRKnz'
const BUILD_PATH = process.env.BUILD_PATH || (__dirname + '/../client-dist')

const isDevelopment = NODE_ENV === 'development'

console.log(`Building in env: "${NODE_ENV}" to path: "${BUILD_PATH}"`)

const API_URL = process.env.API_URL
const PORT = process.env.PORT || 5000

const config = {
  context: __dirname,
  entry: {
    app: _.compact([
      isDevelopment && 'react-hot-loader/patch',
      './src/index.js'
    ]),
    vendor: _.compact([
      'babel-polyfill',
      isDevelopment && `webpack-dev-server/client?http://localhost:${PORT}`
    ])
  },
  output: {
    filename: 'main.[hash].js',
    path: BUILD_PATH,
  },
  resolve: {
    modules: ['./src', './node_modules'],
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }),
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js'
    }),
    new ExtractTextPlugin('style.[hash].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.tpl.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV),
        'API_URL': JSON.stringify(API_URL),
        'FILESTACK_API_KEY': JSON.stringify(FILESTACK_API_KEY)
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}

if (isDevelopment) {
  config.plugins.push(
    ...[
      new webpack.HotModuleReplacementPlugin()
    ]
  )
}

module.exports = config
