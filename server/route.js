const express = require ('express')
const Router = express.Router()
const mysql = require('mysql');

//创建数据库连接对象
const connection = mysql.createConnection({
	host: 'localhost', //数据库地址
	user: 'gong', //账号
	password: '123456', //密码
	database: 'digitalmanagement', //库名
	multipleStatements: true //允许执行多条语句
});
// connection.connect( (err, data) => {
//   if (err) {
//     console.log(err)
//   }else {
//     console.log('succeed',data)
//   }
// })
Router.get ('/index', (req, res) => {
  console.log(req)
  res.send('后台返回的数据')
})
Router.post ('/inquiry', (req, res) => {
  console.log(req.body)
  res.send('表单提交后返回的数据')
})
Router.post ('/add', (req, res) => {
  console.log(req)
  console.log(req.body)
  res.send('表单添加后返回的数据')
})


module.exports = Router