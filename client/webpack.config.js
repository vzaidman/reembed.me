const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development'

const isDevelopment = NODE_ENV === 'development'

const config = {
  context: __dirname,
  entry: {
    app: './src/index.js',
    vendor: [
      'babel-polyfill',
      'react-hot-loader',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server'
    ]
  },
  output: {
    filename: 'main.[hash].js',
    path: './dist',
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

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js'
    }),
    new ExtractTextPlugin('/style.[hash].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.tpl.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV)
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