import Webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import path from 'path'

const {
  PORT = 8080,
  HOST = '0.0.0.0',
  NODE_ENV = 'development',
  BUILD_DIR = path.resolve(__dirname, 'dist'),
  WEBPACK_DEVTOOL = 'inline-source-map',
} = process.env

const APP_DIR = path.resolve(__dirname, 'app')
const isProd = NODE_ENV === 'production'

const config = {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server',
    './app/main.jsx',
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/',
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
      test: /\.json$/,
      include: [APP_DIR],
      loader: 'json-loader',
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
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin(),
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true }),
    new HtmlWebpackPlugin({
      template: path.resolve(APP_DIR, 'index.html'),
    }),
  ],
  devServer: {
    hot: true,
    contentBase: BUILD_DIR,
    publicPath: '/',
    port: PORT,
    historyApiFallback: true,
    host: HOST,
    noInfo: true,
  },
  devtool: isProd ? 'cheap-module-source-map' : WEBPACK_DEVTOOL,
  context: __dirname,
  target: 'web',
}

export default config
