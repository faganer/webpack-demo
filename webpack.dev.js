const {
  merge
} = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  cache: {
    type: 'memory'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    // compress: true,
    port: 9000,
    hot: true,
    // open:true
  },
})
