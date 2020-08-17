const express = require('express')
const hbs = require('express-handlebars')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
const passport = require('passport')
const app = express()
require('./passport/passport') 

const webRoutes = require('./routes/web')
const auhtRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')

const PORT = 5000 

app.set('view engine', 'hbs')

app.engine('hbs', hbs({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}))


app.use(express.static('public'))
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})


app.use('/', webRoutes)
app.use('/auth', auhtRoutes)
app.use('/dashboard', adminRoutes)

app.listen(PORT, () => {
  console.log('Server starting in port ' + PORT + '.')
})