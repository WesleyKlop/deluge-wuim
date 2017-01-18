import Webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ServiceWorkerPlugin from 'serviceworker-webpack-plugin'
import path from 'path'
import { basename as publicPath } from './settings.json'

const {
  BUILD_DIR = path.resolve(__dirname, 'dist'),
} = process.env

const APP_DIR = path.resolve(__dirname, 'app')
const NODE_ENV = 'production'

const config = {
  entry: ['./app/main.jsx'],
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js',
    publicPath,
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: [APP_DIR],
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      include: [APP_DIR],
      loader: ExtractTextPlugin.extract({
        loader: 'css-loader?sourceMap&modules&camelCase!postcss-loader',
      }),
    }, {
      test: /\.css$/,
      include: [/node_modules/],
      loader: ExtractTextPlugin.extract({
        loader: 'css-loader?sourceMap!postcss-loader',
      }),
    }, {
      test: /\.html$/,
      include: [APP_DIR],
      loader: 'html-loader',
    }, {
      test: /\.(jpe?g|png|gif|webp|svg)$/i,
      loaders: [
        'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack-loader?bypassOnDebug?optimizationLevel=7&interlaced=false',
      ],
    }],
  },
  resolve: {
    modules: [
      'node_modules',
      APP_DIR,
    ],
    extensions: ['.js', '.json', '.jsx'],
  },
  plugins: [
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true }),
    new HtmlWebpackPlugin({
      template: path.resolve(APP_DIR, 'index.html'),
      inject: 'body',
    }),
    new ServiceWorkerPlugin({
      entry: path.join(APP_DIR, 'service-worker.js'),
    }),
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new Webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
  ],
  context: __dirname,
  target: 'web',
}

export default config
