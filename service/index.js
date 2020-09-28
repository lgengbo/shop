const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const Router = require('koa-router')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const {connect, initSchemas} = require('./database/init.js')
let user = require('./appApi/user.js')
// 注册跨域的中间件
app.use(cors())
// 注册koa-bodyparser中间件
app.use(bodyParser())
// 装载所有子路由
let router = new Router()
router.use('/user', user.routes())
// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// 立即执行函数
;(async () => {
  await connect() // 创建连接
  initSchemas() // 初始化数据库结构，一次性引入多个schema
  // const User = mongoose.model('User')
  // let oneUser = new User({userName: 'jspang12', passWord: '12345651'}) // 插入数据
  // oneUser.save().then(() => {
  //   // 插入数据
  //   console.log('插入成功')
  // })
  // let users = await User.findOne({}).exec() // 读取数据
  // console.log(users)
})()

app.use(async (ctx) => {
  ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000, () => {
  console.log('sussess')
})
