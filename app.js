const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const messageHadler = require('./middlewares/message-hadler')
const router = require('./routes')
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
app.use(router)

app.get('/', (req, res) => {
  res.redirect('/tracks')
})

app.get('/logout', (req, res) => {
  res.send('Logout bye~')
})

app.listen(port, () => {
  console.log(`It is running on server http://localhost:${port}`)
})
