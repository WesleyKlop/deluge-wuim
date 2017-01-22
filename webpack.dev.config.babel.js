import Webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ServiceWorkerPlugin from 'serviceworker-webpack-plugin'
import path from 'path'
import { basename as publicPath } from './settings.json'

const {
  PORT = 8080,
  HOST = '0.0.0.0',
  BUILD_DIR = path.resolve(__dirname, 'dist'),
  WEBPACK_DEVTOOL = 'inline-source-map',
} = process.env

const APP_DIR = path.resolve(__dirname, 'app')
const NODE_ENV = 'development'

const config = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server',
    './app/main.jsx',
  ],
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
      loaders: [
        'style-loader',
        'css-loader?sourceMap&modules&camelCase',
        'postcss-loader',
        // 'stylefmt-loader',
      ],
    }, {
      test: /\.css$/,
      include: [/node_modules/],
      loaders: [
        'style-loader',
        'css-loader?sourceMap',
        'postcss-loader',
      ],
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
    }, {
      test: /manifest\.json$/,
      loader: 'file-loader',
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
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin(),
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(APP_DIR, 'index.html'),
    }),
    new ServiceWorkerPlugin({
      entry: path.join(APP_DIR, 'service-worker.js'),
    }),
  ],
  devServer: {
    hot: true,
    contentBase: BUILD_DIR,
    publicPath,
    port: PORT,
    historyApiFallback: true,
    host: HOST,
    noInfo: true,
  },
  devtool: WEBPACK_DEVTOOL,
  context: __dirname,
  target: 'web',
}

export default config
