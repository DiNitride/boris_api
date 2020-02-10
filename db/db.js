const mongoose = require('mongoose')

var mongoDB = 'mongodb://127.0.0.1/boris'
mongoose.connect(mongoDB, { useNewUrlParser: true})
