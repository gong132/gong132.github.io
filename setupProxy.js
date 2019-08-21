// const proxy = require('http-proxy-middleware')

// module.exports = function(app) {
//   app.use(
//     proxy('/api', {  //`api`是需要转发的请求
//       target: 'http://192.168.0.105:8060',  // 这里是接口服务器地址
//       changeOrigin: true,
//     })
//   )
// }