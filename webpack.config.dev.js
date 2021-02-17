// === by v-5.21.2   webpack.config.dev.js   14.02.2021
// ******** common section *******
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const PrettierPlugin = require('prettier-webpack-plugin')
// const ESLintPlugin = require('eslint-webpack-plugin')
// const paths = require('./paths')
// ******** prodaction  section *******

// const webpack = require("webpack");
// const TerserPlugin = require("terser-webpack-plugin");
// ******* develop section **

// ******** develop section *******
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'normal',
  // 'process.env.NODE_ENV': JSON.stringify('development' || process.env.NODE_ENV)
  output: {
    path: path.resolve(__dirname, 'dist/assets/'),
    publicPath: '/',
    filename: 'bundle.js',
    // /dist/assets/name.ext  for asset Modules
    assetModuleFilename: 'assets/[name][ext]',
  },

  module: {
    rules: [
      {
        // JavaScript: Use Babel to transpile JavaScript files
        test: /\.(js|jsx)$/,
        exclude: /(node_modules | bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }], ['@babel/react']],
          },
        },
      },
      {
        test: /\.css$/,
        type: 'asset/resource',
        // use: ["style-loader", "css-loader"]
      },
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1, modules: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      // Images: Copy image files to build folder
      /* By default, modules with the asset/resource type are added to the directory,
       which you specify in output.path (default to 'dist'),
       but using output.assetModuleFilename can be overridden
       this behavior: "output: {assetModuleFilename: 'assets/[name] [ext]'",

       Moreover, we can override the output filename for a specific asset rule.
       For example, you can add svg icons to the 'dist/icons' directory,
       and the rest of the asset modules to the 'dist/assets' directory:
       */
      {
        test: /\.svg$/,
        type: 'asset/resource', // ?????
        generator: {
          filename: 'svgicons/[name][ext]',
        },
        use: 'svgo-loader',
      }, // /dist/svgicons/name_svg.svg

      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'imgs/[name][ext]',
        },
      }, // /dist/images/name_svg.svg

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },

  resolve: { extensions: ['*', '.js', '.jsx'] },

  // Customize the webpack build process
  plugins: [
    // new webpack.HotModuleReplacementPlugin(), // for devServer HMR
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets_src/', //paths.public,
          to: './',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    /*    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      favicon: paths.src + '/images/favicon.png',
      template: paths.src + '/template.html', // template file
      filename: 'index.html', // output file
    }),
*/
  ],

  optimization: {
    minimize: false,
  },
}
