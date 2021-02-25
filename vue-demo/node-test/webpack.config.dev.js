var webpack = require("webpack");
var webpackBase = require("./webpack.config.base.js");
let HtmlWebpackPlugin = require('html-webpack-plugin')


var cfg = Object.assign(webpackBase, {
    devtool: "cheap-module-eval-source-map"
});

//entry
Object.getOwnPropertyNames((webpackBase.entry || {})).map(function (name) {
    cfg.entry[name] = []
        //添加HMR文件
       
        .concat("webpack-hot-middleware/client?reload=true&quiet=true")
       
        .concat(webpackBase.entry[name])
});


//plugins
cfg.plugins = (webpackBase.plugins || []).concat(
    new webpack.optimize.OccurrenceOrderPlugin(),
    //添加HMR插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
       
        template: 'index.html'
      }),
)

module.exports = cfg;