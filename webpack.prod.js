const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
    cacheDirectory: path.resolve(__dirname, '.cache'),
  },
  optimization: {
    minimize: true,
    runtimeChunk: 'single',
    splitChunks: {
     chunks: 'all',
   }
  }
});
