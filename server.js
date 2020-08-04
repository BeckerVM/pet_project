const express = require('express')
const hbs = require('express-handlebars')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

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

app.use(cors())
app.use(morgan('dev'))
app.use(express.static('public'))
app.use('/', webRoutes)
app.use('/auth', auhtRoutes)
app.use('/dashboard', adminRoutes)

app.listen(PORT, () => {
  console.log('Server starting in port ' + PORT + '.')
})