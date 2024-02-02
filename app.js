const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const port = 3000
const db = require('./models')
const Track = db.Track

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.redirect('/tracks')
})

app.get('/tracks', (req, res) => {
  return Track.findAll({
    attributes: ['id', 'name', 'date', 'category', 'amount'],
    raw: true
  })
    .then((tracks) => {
      let totalAmount = 0
      for (i = 0; i < tracks.length; i++) {
        totalAmount += tracks[i].amount
      }
      res.render('tracks', { tracks, totalAmount })
    })
})

app.get('/tracks/new', (req, res) => {
  res.render('new')
})

app.post('/tracks/new', (req, res) => {
  const info = req.body
  const name = info.name
  const date = info.date
  const category = info.category
  const amount = info.amount
  console.log(info)
  return Track.create({ name, date, category, amount })
    .then(() => res.redirect('/tracks'))
    .catch((err) => console.log(err))
})

app.get('/tracks/edit/:id', (req, res) => {
  const id = req.params.id
  return Track.findByPk(id, {
    attributes: ['id', 'name', 'date', 'category', 'amount'],
    raw: true
  })
    .then((track) => {
      res.render('edit', { track })
    })
})

app.put('/tracks/:id', (req, res) => {
  const info = req.body
  const id = req.params.id
  return Track.update({
    name: info.name,
    date: info.date,
    category: info.category,
    amount: info.amount
  }, {
    where: { id }
  })
    .then(() => res.redirect('/tracks'))
    .catch((err) => console.log(err))
})

app.delete('/tracks/:id', (req, res) => {
  const id = req.params.id

  return Track.destroy({ where: { id } })
    .then(() => res.redirect('/tracks'))
    .catch((err) => console.log(err))
})

app.get('/logout', (req, res) => {
  res.send('Logout bye~')
})

app.listen(port, () => {
  console.log(`It is running on server http://localhost:${port}`)
})
