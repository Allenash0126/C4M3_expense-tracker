const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const db = require('./models')
const Track = db.Track

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended : true }))

app.get('/', (req, res) => {
  res.redirect('/tracks')
})

app.get('/tracks', (req, res) => {
  // res.render('index')
  return Track.findAll({
    attributes: ['id', 'name', 'date', 'category', 'amount'], 
    raw: true
  })
    .then((tracks) => {
      const amount = tracks[0].amount
      res.render('tracks', { amount })
      // console.log(tracks)
      // console.log(tracks[0].amount)
    })
})

app.get('/tracks/new', (req, res) => {
  res.render('new')
})

app.post('/tracks/new', (req, res) => {
  const info = req.body
  const name = info.name
  console.log(info)
  res.redirect('/tracks')
})

app.get('/tracks/edit', (req, res) => {
  // 待新增id路由
  res.render('edit')
})

app.post('/tracks/edit', (req, res) => {
  // 待新增id路由
  const info = req.body
  console.log(info)
  res.redirect('/tracks')
})

app.get('/tracks/delete', (req,res) => {
  res.send('It has been deleted')
})

app.get('/logout', (req, res) => {
  res.send('Logout bye~')
})

app.listen(port, () => {
  console.log(`It is running on server http://localhost:${port}`)
})
