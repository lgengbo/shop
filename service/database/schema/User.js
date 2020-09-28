const mongoose = require('mongoose') // 引入Mongoose
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema // 声明Schema
let ObjectId = Schema.Types.ObjectId // 声明Object类型
// 定义加密密码计算强度
const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
  UserId: ObjectId,
  userName: {unique: true, type: String}, // unique: 唯一索引
  passWord: String,
  createAt: {type: Date, default: Date.now()},
  lastLoginAt: {type: Date, default: Date.now()}
})

// 每次存储数据时都要执行
userSchema.pre('save', function (next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.passWord, salt, (err, hash) => {
      if (err) return next(err)
      this.passWord = hash
      next()
    })
  })
})

// 密码比对的方法
userSchema.methods = {
  comparePassword: (_passWord, passWord) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_passWord, passWord, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}
mongoose.model('User', userSchema)
