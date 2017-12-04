// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    env: require('./dev.env'),
    port: 8083,
    host: 'localhost',
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/translation': {
        target: 'https://api.prozis.tech',
        changeOrigin: true,
        pathRewrite: {
          '^/api/translation': '/apiman-gateway/intranet/erp-private/1.0/ws_message_translation'
        },
        headers: {
          'Content-type': 'application/json'
        }
      },

      '/api/public': {
        target: 'https://api.prozis.tech',
        changeOrigin: true,
        pathRewrite: {
          '^/api/public': '/apiman-gateway/_dev-intranet/erp-public/1.0'
        },
        headers: {
          'Content-type': 'application/json'
        }
      },

      '/api/private': {
        target: 'https://api.prozis.tech',
        changeOrigin: true,
        pathRewrite: {
          '^/api/private': '/apiman-gateway/_dev-intranet/erp-private/1.0'
        },
        headers: {
          'Content-type': 'application/json'
        }
      },
      '/test': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/test': '/'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false
  }
};
