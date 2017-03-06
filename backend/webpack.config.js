// Source https://gregshackles.com/getting-started-with-serverless-and-typescript/

/*

 You can go ahead and run this locally by running:

 sls webpack invoke -f hello -p event.json

 */

/*
 You can also simulate API Gateway locally by running:

 $ sls webpack serve

 This will allow you to hit http://localhost:8000/hello to trigger your function.
 If you run sls deploy Serverless will deploy your function out to AWS and provide you with the endpoint that you can hit there as well.

 */

/*
 * Plugin: DefinePlugin
 * Description: Define free variables.
 * Useful for having development builds with debug logging or adding global constants.
 *
 * Environment helpers
 *
 * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
 */
var webpack = require('webpack');

const settings = {
    'process.env.NODE_ENV': JSON.stringify('dev')
};

var path = require('path');
module.exports = {
    entry: './src/app/app.ts',
    target: 'node',
    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader'
            },
            /*
             * Json loader support for *.json files.
             *
             * See: https://github.com/webpack/json-loader
             */
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ],
        postLoaders: [
            {
                test: /\.js$/,
                loader: 'string-replace-loader',
                query: {
                    search: 'var sourceMappingUrl = extractSourceMappingUrl\\(cssText\\);',
                    replace: 'var sourceMappingUrl = "";',
                    flags: 'g'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx', '']
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: 'app.js'
    },
    externals: [
        'aws-sdk', // aws-sdk included in Lambda
        'uuid'
    ],
    plugins: [
        // set NODE_ENV variable to production. Used by some libraries such
        // as react to perform extra optimizations
        new webpack.DefinePlugin(settings)
        //new webpack.BannerPlugin('require("source-map-support").install();',
        //                        { raw: true, entryOnly: false })
    ]
};