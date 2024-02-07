const express = require('express')
const router = express.Router()

const passport = require('passport')
const LocalStrategy = require('passport-local')
const db = require('../models')
const User = db.User

passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
  return User.findOne({
    attributes: ['id', 'name', 'email', 'password'],
    where: { email: username },
    raw: true
  })
    .then((user) => {
      if (!user || user.password !== password) {
        return done(null, false, { message: '帳號或密碼錯誤:(' })
      }
      return done(null, user)
    })
    .catch((error) => {
      error.errorMessage = '登入失敗:('
      done(error)
    })
}))

passport.serializeUser((user, done) => {
  const { id, name, email } = user
  done(null, { id, name, email })
})

passport.deserializeUser((user, done) => {
  done(null, { id: user.id })
})

const tracks = require('./tracks')
const users = require('./users')
const authHandler = require('../middlewares/auth-handler')
router.use('/tracks', authHandler, tracks)
// 除了引用tracks.js，也將重複的路由/tracks內建，可移除tracks.js內的/tracks路由
router.use('/users', users)

router.get('/', (req, res) => {
  res.redirect('/tracks')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/tracks',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/logout', (req, res) => {
  req.logout((error) => {
    if (error) {
      next(error)
    }
    return res.redirect('login')
  })
})

module.exports = router
