const express = require('express')
const hbs = require('express-handlebars')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
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
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname))
  }
})
app.use(multer({ storage }).single('imagen'))

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