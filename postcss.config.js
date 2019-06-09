const purgecss = require("@fullhuman/postcss-purgecss")
class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:/]+/g) || []
    }
}

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
            extractors: [
                {
                    extractor: TailwindExtractor,
                    extensions: ['vue'],
                },
            ],
            whitelist: ['html', 'body'],
            whitelistPatterns: [
                /material-design-icon/,
                /fade-/,
                /page-/,
                /border-/,
                /transition/,
                /tooltip/,
                /y-bg-bars/,
                /y-axis/,
            ],
            whitelistPatternsChildren: [
                /y-bg-bars/,
                /y-axis/,
            ],
        }) : null,
        require('cssnano')({
            preset: 'default',
            discardComments: { removeAll: true },
            zindex: false
        })
    ]
}