var path = require('path');
var utils = require('./utils');
var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.ts'
    // sw: './src/service-worker/sw.ts'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts', '.tsx', '.json', '.html', '.scss', '.css'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      // 'vue$': 'vue/dist/vue.esm.js',
      assets: resolve('src/assets'),
      components: resolve('src/components'),
      core: resolve('src/core'),
      crud: resolve('src/crud'),
      requests: resolve('src/requests'),
      modules: resolve('src/modules'),
      constants: resolve('src/constants'),
      services: resolve('src/services'),
      models: resolve('src/models'),
      router: resolve('src/router'),
      store: resolve('src/store'),
      views: resolve('src/views')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include: [resolve('src')],
        exclude: /node_modules/,
        // for osx --> options: { appendTsSuffixTo: [/\.vue$/], configFileName: resolve('tsconfig.json') }
        options: {
          appendTsSuffixTo: [/\.vue$/],
          tsconfig: resolve('tsconfig.json')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader',
        include: [resolve('src')],
        exclude: /node_modules/
      }
    ]
  }
};
