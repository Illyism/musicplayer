const manifestJSON = require('./public/manifest.json')

module.exports = {
  productionSourceMap: false,
  pwa: {
    name: manifestJSON.short_name,
    themeColor: manifestJSON.theme_color,
    msTileColor: manifestJSON.background_color,
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    workboxOptions: {
      skipWaiting: true
    }
  },
}