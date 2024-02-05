const express = require('express')
const router = express.Router()

const tracks = require('./tracks')
router.use('/tracks', tracks) 
//除了引用tracks.js，也將重複的路由/tracks內建，可移除tracks.js內的/tracks路由

router.get('/', (req, res) => {
  res.redirect('/tracks')
})

module.exports = router