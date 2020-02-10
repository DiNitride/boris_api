let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let authorization = require('./middleware/authorization')

const db = require('./db/db')

let indexRouter = require('./routes/index')
let ordersRouter = require('./routes/orders')
let authRouter = require('./routes/auth')
let shoppyRouter = require('./routes/shoppy')

let app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json({verify: function(req, res, buf, encoding) {
  req.rawBuf = buf
}}))

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(authorization())

app.use('/', indexRouter)
app.use('/oauth2', authRouter)
app.use('/orders', ordersRouter)
app.use('/shoppy', shoppyRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
