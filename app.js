const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const messageHandler = require('./middlewares/message-handler')
const errorHandler = require('./middlewares/error-handler')
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
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(flash())
app.use(messageHandler)
app.use(router)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.redirect('/tracks')
})

app.get('/logout', (req, res) => {
  res.send('Logout bye~')
})

app.listen(port, () => {
  console.log(`It is running on server http://localhost:${port}`)
})
