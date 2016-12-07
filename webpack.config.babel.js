import Webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import NotifierPlugin from 'webpack-notifier'
import path from 'path'

const {
  PORT = 8080,
  HOST = '0.0.0.0',
  NODE_ENV = 'development',
  BUILD_DIR = `${__dirname}/dist`,
  WEBPACK_DEVTOOL = 'eval-source-map',
} = process.env

const config = {
  context: `${__dirname}/app`,
  entry: [
    'react-hot-loader/patch',
    './main.jsx',
  ],
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devtool: WEBPACK_DEVTOOL,
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel',
      }, {
        test: /\.css$/,
        include: /app/,
        exclude: /node_modules/,
        loaders: [
          'style?sourceMap',
          'css?camelCase&modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]',
          'postcss',
          //'stylefmt?config=.stylelintrc',
        ],
      }, {
        test: /\.css$/,
        exclude: /app/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style?sourceMap',
          'css',
        ),
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      }, {
        test: /\.json$/, loader: 'json',
      },
    ],
  },
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: PORT,
    host: HOST,
    compress: true,
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    new ExtractTextPlugin('app.css'),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      files: ['**/*.css'],
    }),
    new NotifierPlugin({
      title: 'Deluge WUIM',
      contentImage: path.join(__dirname, 'app/assets/deluge.png'),
      alwaysNotify: true,
    }),
  ],
}

export default config
