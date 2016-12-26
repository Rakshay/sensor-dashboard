var webpack = require('webpack');

module.exports = {
  entry: [
    './src/js/views/index.js'
  ],
  output: {
    filename: './dist/index.build.js'
  },
  resolve: {
    extensions: ['', '.js', '.scss', '.jsx', '.less']
  },
  module: {
    loaders: [{
      test: /(\.js$)|(\.jsx$)/,
      loaders: ['envify-loader', 'babel', 'babel-loader']
    }]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  devtool: 'inline-source-map'
};
