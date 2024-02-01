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
  res.redirect('/track')
})

app.get('/track', (req, res) => {
  // res.render('index')
  return Track.findAll()
    .then((tracks) => res.send({tracks}))
})

app.get('/track/new', (req, res) => {
  res.render('new')
})

app.post('/track/new', (req, res) => {
  const info = req.body
  const name = info.name
  console.log(info)
  res.redirect('/track')
})

app.get('/track/edit', (req, res) => {
  // 待新增id路由
  res.render('edit')
})

app.post('/track/edit', (req, res) => {
  // 待新增id路由
  const info = req.body
  console.log(info)
  res.redirect('/track')
})

app.get('/track/delete', (req,res) => {
  res.send('It has been deleted')
})

app.get('/logout', (req, res) => {
  res.send('Logout bye~')
})

app.listen(port, () => {
  console.log(`It is running on server http://localhost:${port}`)
})
