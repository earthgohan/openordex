const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
    output: {
        path: path.join(__dirname, 'dist/'),
        publicPath: '/',
    },

    entry: {
        // define HTML files here
        index: './index.html',  // => dist/index.html
        inscription: './inscription.html', // => dist/example.html
        // ...
    },

    plugins: [
        new HtmlBundlerPlugin({
            js: {
                // output filename of extracted JS from source script loaded in HTML via `<script>` tag
                filename: 'assets/js/[name].[contenthash:8].js',
            },
            css: {
                // output filename of extracted CSS from source style loaded in HTML via `<link>` tag
                filename: 'assets/css/[name].[contenthash:8].css',
            },
        }),
    ],

    module: {
        rules: [
            {
                test: /\.json$/,
                use: ['json-loader'],
                type: 'javascript/auto'
            },
            {
                test: /\.woff/,
                type: 'asset/resource'
            },
            // Note: enable processing of HTML files from entry
            {
                test: /\.html$/,
                loader: HtmlBundlerPlugin.loader, // HTML loader
            },
            // styles
            {
                test: /\.(css|sass|scss)$/,
                use: [{
                    // CSS to CommonJS (resolves CSS imports into exported CSS strings)
                    loader: 'css-loader',
                    options: {

                        url: false,
                        // import: false
                    }
                }, 'sass-loader'],

            },


            // images
            {
                test: /\.(png|jpe?g|svg|ico)/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name].[hash:8][ext]',
                },
            },
        ],
    },
};