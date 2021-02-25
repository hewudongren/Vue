var path = require("path");
let express = require('express')
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var webpackCfg = require("./webpack.config.dev.js");

var compiler = webpack(webpackCfg);
var app = express();

//运行Server
let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackCfg.output.publicPath,
    quiet: true,
    watchOptions: {
      aggregateTimeout: 800,
      ignored: /node_modules/
    },
    stats: { colors: true }
  })
  
  //实现代码热部署
  let hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
  })

//init server
// var app = new webpackDevServer(compiler, {
//     //注意此处publicPath必填
//     contentBase:path.resolve(__dirname,'/'),
//     inline: true,
//     publicPath: webpackCfg.output.publicPath,
//     //HMR配置
//     hot:true
// });
// compiler.plugin('compilation', function (compilation) {
//     compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//       hotMiddleware.publish({
//         action: 'reload'
//       })
//       cb()
//     })
//   })
app.use(devMiddleware)
app.use(hotMiddleware)
app.listen(9390, "localhost", function (err) {
    if (err) {
        console.log(err);
    }
});

console.log("listen at http://localhost:9390");