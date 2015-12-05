var path = require('path');
var webpack = require('webpack');
var xtPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var csswring = require('csswring');

var bundle = process.env.BUNDLE || 'client';

var cfg = {
  devtool: 'source-map',
  context: path.join(__dirname, '../src'),
  entry: [
    './' + bundle
  ],

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist/'),
    publicPath: 'dist/',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      __DEVELOPMENT__: false,
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
    }),
  ],

  // resolve: {
  //   extensions: ['', '.jsx', '.js', '.json'],
  //   modulesDirectories: ['node_modules', 'src'],
  // },

  module: {
    loaders: [
    {
      test: /\.json$/, loader: 'json'
    },
    {
      test: /bootstrap\/js\//,
      loader: 'imports?jQuery=jquery',
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff',
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff2',
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream',
    }, {
      test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-otf',
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file',
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml',
    }, {
      test: /\.js$/,
      loaders: ['react-hot', 'babel?stage=0&loose[]=es6.modules'],
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      loader: 'css!postcss-loader!sass',
    }, {
      test: /\.png$/,
      loader: 'file?name=[name].[ext]',
    }, {
      test: /\.jpg$/,
      loader: 'file?name=[name].[ext]',
    }],
  },
  postcss: function() {
    return [autoprefixer({ browsers: ['last 2 versions', 'safari 5', 'ie 9', 'ios 6', 'android 4'] }), csswring];
  },
};

if (bundle === 'server') {
  cfg.target = 'node';

  cfg.node = {
    __filename: false,
    __dirname: false,
    console: false
  };

  cfg.output = {
    path: path.join(__dirname, '../public'),
    publicPath: '/',
    filename: '../server-bundle.js'
  };
} else {
  cfg.target = 'web';

  cfg.output = {
    path: path.join(__dirname, '../public'),
    publicPath: '/',
    filename: 'js/app.js'
  };
}

module.exports = cfg;
