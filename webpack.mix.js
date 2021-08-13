const mix = require('laravel-mix');
const webpack = require('webpack');

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
      })
   ],
})
