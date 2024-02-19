const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

router.post('/', (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    req.flash('fail', '密碼與驗證密碼不同:(')
    res.redirect('/register')
  }

  return User.findAll({
    attributes: ['name', 'email', 'password'],
    raw: true
  })
    .then((users) => {
      const isEmailExist = users.find((user) => email === user.email)
      if (isEmailExist) {
        req.flash('fail', '已有帳戶，請直接登入:)')
        return res.redirect('/login')
      }
      return bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({ name, email, password: hash })
            .then(() => {
              req.flash('success', '註冊成功！ 請登入:)')
              res.redirect('/login')
            })
            .catch((error) => {
              error.errorMessage = '註冊失敗:('
              next(error)
            })
        })
    })
})

module.exports = router
