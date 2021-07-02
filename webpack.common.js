const CopyPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const StylelintPlugin = require('stylelint-webpack-plugin')
const webpack = require('webpack')

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  // const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
  const entryFiles = glob.sync(path.join(__dirname, './src/js/*.js'))
  // eslint-disable-next-line lodash/prefer-lodash-method
  Object.keys(entryFiles).map(index => {
    const entryFile = entryFiles[index]
    // const match = entryFile.match(/src\/(.*)\/index\.js/);
    // const pageName = match && match[1];
    const pageName = path.basename(entryFile, '.js')
    // entry[pageName] = entryFile;
    if (pageName !== 'main') {
      entry[pageName] = './src/js/' + path.basename(entryFile)
      const htmlWebpackPlugin = new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/html/${pageName}.html`),
        filename: `${pageName}.html`,
        hash: true,
        // 使用chunk
        chunks: [pageName],
        // 打包出的chunk自动注入
        inject: 'body', // true为head之间，'body'为body结束标签前
        minify: {
          html5: true,
          // 删除空格和换行符，若preserveLineBreaks参数设为true，则保留了换行符
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true
        }
      })
      htmlWebpackPlugins.push(htmlWebpackPlugin)
    }
  })
  return {
    entry,
    htmlWebpackPlugins
  }
}

const {
  entry,
  htmlWebpackPlugins
} = setMPA()

module.exports = {
  entry: entry,
  target: ['web', 'es5'],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Clean the output directory before emit.
    assetModuleFilename: 'images/[name].[hash][ext][query]' // https://webpack.js.org/guides/asset-modules/
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      _:'lodash',
      Swal:'sweetalert2/dist/sweetalert2.js'
    }),
    new ESLintPlugin({
      fix:true
    }),
    new StylelintPlugin({
      fix:true
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/public'), to: path.resolve(__dirname, 'dist/public') },
      ],
    }),
  ].concat(htmlWebpackPlugins),
  module: {
    rules: [
      // Loading CSS
      // https://webpack.js.org/guides/asset-management/#loading-css
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      // sass-loader
      // https://webpack.js.org/loaders/sass-loader/
      {
        test: /\.scss$/,
        use: [{
            loader: 'style-loader' // inject CSS to page
          }, {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run postcss actions
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          }, {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      // less-loader
      // https://webpack.js.org/loaders/less-loader/
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'style-loader',
          },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                paths: [path.resolve(__dirname, 'node_modules')],
              },
            },
          },
        ],
      },
      // Loading Images
      // https://webpack.js.org/guides/asset-management/#loading-images
      // https://www.jianshu.com/p/36e972b19b28
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        //解析
        parser: {
          //转base64的条件
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          }
        },
        // generator:{
        //   //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
        //   filename:'images/[name].[hash][ext][query]',
        //   //打包后对资源的引入，文件命名已经有/img了
        //   publicPath:'./'
        // },
      },
      // Loading Fonts
      // https://webpack.js.org/guides/asset-management/#loading-fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // babel-loader
      // https://webpack.js.org/loaders/babel-loader/
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
      // html-loader
      // https://webpack.js.org/loaders/html-loader/
      // 很多功能与HtmlWebpackPlugin重合
      // {
      //   test: /\.html$/i,
      //   loader: 'html-loader',
      //   options: {
      //     minimize: false, // 排除与 HtmlWebpackPlugin 功能重合
      //     esModule: false,
      //   },
      // },
    ]
  }
}
