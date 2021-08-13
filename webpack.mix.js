const mix = require('laravel-mix');
const webpack = require('webpack');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js');

mix.copy('node_modules/tinymce/skins', 'public/js/skins');

mix.webpackConfig({
    resolve: {
        modules: [
          path.resolve(__dirname, 'resources/assets/js'),
          path.resolve(__dirname, 'resources/assets/store'),
          path.resolve(__dirname, 'node_modules'),
        ],
    },
    node:{
      fs:'empty'
    },
    output: {
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },

    plugins: [
   	    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "public/js/common.js",
            minChunks: 2
        }),
        new SWPrecacheWebpackPlugin({
            cacheId: 'pwa',
            filename: 'public/service-worker.js',
            staticFileGlobs: ['public/**/*.{css,eot,svg,ttf,woff,woff2,js,html}'],
            minify: true,
            stripPrefix: 'public/',
            handleFetch: true,
            dynamicUrlToDependencies: { //you should add the path to your blade files here so they can be cached
               //and have full support for offline first (example below)
                '/': ['public/index.html'],
                // '/posts': ['resources/views/posts.blade.php']
            },
            staticFileGlobsIgnorePatterns: [/\.map$/, /mix-manifest\.json$/, /manifest\.json$/, /service-worker\.js$/],
            navigateFallback: '/',
            // runtimeCaching: [
            //     {
            //         urlPattern: /^https:\/\/code\.jquery\.com\//,
            //         handler: 'cacheFirst'
            //     },
            //     {
            //         urlPattern: /^https:\/\/maxcdm\.bootstrapcdn\.com\//,
            //         handler: 'cacheFirst'
            //     },
            //     {
            //         urlPattern: /^https:\/\/www\.thecocktaildb\.com\/images\/media\/drink\/(\w+)\.jpg/,
            //         handler: 'cacheFirst'
            //     }
            // ]
        })
    ],
})
