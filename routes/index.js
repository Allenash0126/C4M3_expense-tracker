const express = require('express')
const router = express.Router()

const tracks = require('./tracks')
const users = require('./users')
router.use('/tracks', tracks) 
//除了引用tracks.js，也將重複的路由/tracks內建，可移除tracks.js內的/tracks路由
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

router.get('/logout', (req, res) => {
  res.send('Logout bye~')
})

module.exports = router