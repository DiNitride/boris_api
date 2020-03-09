let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let authorization = require('./middleware/authorization')
let cors = require('cors')

let ordersRouter = require('./routes/orders')
let authRouter = require('./routes/auth')
let shoppyRouter = require('./routes/shoppy')

let app = express()

app.use(cors())

app.use(logger('dev'))
app.use(express.json({verify: function(req, res, buf, encoding) {
  req.rawBuf = buf
}}))

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(authorization())

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
  res.json({'error': error.status})
})

module.exports = app
