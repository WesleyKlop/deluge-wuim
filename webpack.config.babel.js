import Webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const {
  PORT = 8080,
  HOST = '0.0.0.0',
  NODE_ENV = 'development',
  BUILD_DIR = `${__dirname}/dist`,
  WEBPACK_DEVTOOL = 'cheap-module-source-map',
} = process.env

const config = {
  context: `${__dirname}/app`,
  entry: [
    'react-hot-loader/patch',
    './main.jsx',
  ],
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
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
        test: /\.scss$/,
        include: /app/,
        loader: ExtractTextPlugin.extract(
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]',
          'postcss',
          'sass',
        ),
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style?sourceMap',
          'css',
          'postcss',
          'sass',
        ),
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ],
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
    proxy: {
      // Proxy calls like /api/json to https://app.wesleyklop.nl/deluge/json
      '/api/**': {
        target: 'http://localhost:8112/',
        changeOrigin: true,
        secure: true,
        pathRewrite: { '^/api/': '' },
      },
    },
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
  ],
}

export default config
