const manifestJSON = require('./public/manifest.json')

module.exports = {
  productionSourceMap: false,
  pwa: {
    name: manifestJSON.short_name,
    themeColor: manifestJSON.theme_color,
    msTileColor: manifestJSON.background_color,
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    workboxOptions: {
      exclude: [
        /\.map$/, // don't cache source maps
        /^manifest.*\.js$/, // don't cache manifest script that is injected
        /^_/, // don't cache _headers, _redirects from netlify
      ]
    }
  },
  transpileDependencies: [
    'vue-match-media',
    'vuex-persist',
  ],
}