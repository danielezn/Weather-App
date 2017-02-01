const PATH = require('path');

const webpack = require("webpack");

const ROOT = '../../../';

const APP_FOLDER = PATH.resolve(__dirname, ROOT);
const APP_ENTRY_FILE = PATH.resolve(__dirname, ROOT, APP_FOLDER, 'client.js');

const BUILD_FOLDER = PATH.resolve(__dirname, ROOT, 'public/js/');
const PUBLIC_PATH = '/js/';

const BUILD_FILE = 'app.js';

var webpackConfig = {
    entry: {
        app: APP_ENTRY_FILE
    },
    output: {
        path: BUILD_FOLDER,
        publicPath: PUBLIC_PATH,
        filename: BUILD_FILE
    },
    devtool: 'inline-source-map',
    debug: true,
    bail: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    APP_FOLDER
                ],
                loader: 'babel',
                query: {
                    compact: false,
                    cacheDirectory: true,
                    plugins: ["transform-decorators-legacy"],
                    presets: ["es2015", "react", "stage-0"]
                }
            },
            {include: /\.json$/, loaders: ["json-loader"]}
        ]
    },
    resolve: {
        extensions: ['', '.json', '.jsx', '.js']
    },
    externals: {
        'axios': 'axios',
        'react': 'React',
        'react-router': 'ReactRouter',
        'history': 'History',
        'react-dom': 'ReactDOM'
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};

module.exports = webpackConfig;