const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const messageHadler = require('./middlewares/message-hadler')
const port = 3000
const db = require('./models')
const Track = db.Track

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
	secret: 'ThisIsSecret',
	resave: false,
	saveUninitialized: false
}))
app.use(flash())
app.use(messageHadler)

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
const { name, date, category,amount } = req.body
  return Track.create({ name, date, category, amount })
    .then(() => {
      req.flash('success','新增成功！')
      res.redirect('/tracks')
    })
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
  const id = req.params.id
  const { name, date, category,amount } = req.body
  return Track.update({ name, date, category, amount
  }, {
    where: { id }
  })
    .then(() => {
      req.flash('success','更新成功！')
      res.redirect('/tracks')
    })
    .catch((err) => console.log(err))
})

app.delete('/tracks/:id', (req, res) => {
  const id = req.params.id

  return Track.destroy({ where: { id } })
    .then(() => {
      req.flash('success','刪除成功！')
      res.redirect('/tracks')
  })
    .catch((err) => console.log(err))
})

app.get('/logout', (req, res) => {
  res.send('Logout bye~')
})

app.listen(port, () => {
  console.log(`It is running on server http://localhost:${port}`)
})
