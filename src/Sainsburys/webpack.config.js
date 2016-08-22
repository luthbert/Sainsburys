var path = require("path");
//var webpack = require("webpack");
//var CommonsPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
//var DirectoryDescriptionFilePlugin = require("webpack/lib/ResolverPlugin");
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var BowerWebpackPlugin = require("bower-webpack-plugin");
//var util = require("util");
//var JSON = require("JSON");
//var less = require("less");
//var extend = require("extend");
//var WebPackSource = require("webpack/lib/source");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ProgrammingTestCompilation = {
    name: "spt",
    resolve: {
        modulesDirectories: ["node_modules", "bower_components"],
        alias: {}
    },
    entry: {
        "app": "./src/scripts/app-start.js",
        //"theme": "./Themes/core.less"
    },
    output: {
        path: root('wwwroot/dist'),
        publicPath: "/dist/",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js",
        sourceMapFileName: "[file].map"
    },
    module: {
        preLoaders: [],
        loaders: [
        {
            test: /\.html$/,
            loader: 'raw'
        }],
    },
    plugins: [
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),*/
        new HtmlWebpackPlugin({
            template: './src/programming-test.html',
            filename: '../programming-test.html',
            chunksSortMode: 'dependency'
        }),
        function () {
            this.plugin("done", function (stats) {
                if (stats.compilation.errors && stats.compilation.errors.length) {
                    console.log(stats.compilation.errors);
                }
            });
        }
    ],
    target: "web",
    devtool: "source-map",
    debug: true
};

var DesignTestCompilation = {
    name: "sdt",
    resolve: {
        modulesDirectories: ["node_modules", "bower_components"],
        alias: {}
    },
    entry: {
        "theme": "./src/themes/app.scss",
        //"theme": "./Themes/core.less"
    },
    output: {
        path: root('wwwroot/dist'),
        publicPath: "/dist/",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js",
        sourceMapFileName: "[file].map"
    },
    module: {
        preLoaders: [],
        loaders: [
        {
            test: /\.css$/,
            loader: "style-loader!css-loader?sourceMap=true"
        },
        {
            test: /\.(sass|scss)$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap=true!sass?sourceMap=true")
        },
        {
            test: /.(jpg|gif|png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
            loader: 'url?limit=2500'
        },
        {
            test: /\.html$/,
            loader: 'raw'
        }],
    },
    plugins: [
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),*/
        new HtmlWebpackPlugin({
            template: './src/design-test.html',
            filename: '../design-test.html',
            chunksSortMode: 'dependency'
        }),
      // Extract css files
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Disabled when in test mode or not in build mode
        new ExtractTextPlugin('css/[name].css'),
        function () {
            this.plugin("done", function (stats) {
                if (stats.compilation.errors && stats.compilation.errors.length) {
                    console.log(stats.compilation.errors);
                }
            });
        }
    ],
    target: "web",
    devtool: "source-map",
    debug: true
};

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

module.exports = [ProgrammingTestCompilation, DesignTestCompilation];