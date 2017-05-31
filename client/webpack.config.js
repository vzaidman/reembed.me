const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const _ = require('lodash')

const NODE_ENV = process.env.NODE_ENV || 'development'
const isDevelopment = NODE_ENV === 'development'

console.log(`Building in env: ${NODE_ENV}`)

const API_URL = process.env.API_URL || '/'

const config = {
  context: __dirname,
  entry: {
    app: _.compact([
      isDevelopment && 'react-hot-loader/patch',
      './src/index.js'
    ]),
    vendor: _.compact([
      'babel-polyfill',
      isDevelopment && `webpack-dev-server/client?${API_URL}`
    ])
  },
  output: {
    filename: 'main.[hash].js',
    path: __dirname + '/../public/client', //TODO: environment variable
  },
  resolve: {
    modules: ['./src', './node_modules'],
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /.js$/,
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
        'API_SERVER': JSON.stringify(API_URL)
      }
    })
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