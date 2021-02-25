var webpack = require("webpack");
var path = require("path");

module.exports = {
    
    
    entry: {
        "app": "./src/views/index.js"
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname,'../dist'),
        publicPath: "/"
    },
    module: {
 
    },
    plugins: []
}