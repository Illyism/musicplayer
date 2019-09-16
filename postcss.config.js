const purgecss = require("@fullhuman/postcss-purgecss")

module.exports = {
    "plugins": [
        require('postcss-import')(),
        require('tailwindcss')('tailwind.config.js'),
        require('autoprefixer')(),
        process.env.NODE_ENV === 'production' ? purgecss({
            content: [
                "./src/**/*.html",
                "./src/**/*.vue"
            ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            whitelist: ['html', 'body'],
            whitelistPatterns: [
                /material-design-icon/,
                /fade-/,
                /page-/,
                /popper/,
                /^text-red-/,
                /^border-red-/,
                /^text-green-/,
                /^border-green-/,
                /^text-primary-/,
                /^border-primary-/,
                /transition/,
                /tooltip/,
                /y-bg-bars/,
                /y-axis/,
            ],
            whitelistPatternsChildren: [
                /popper/,
            ],
        }) : null,
        require('cssnano')({
            preset: 'default',
            discardComments: { removeAll: true },
            zindex: false
        })
    ]
}