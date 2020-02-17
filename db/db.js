const mongoose = require('mongoose')

const { MONGO_ADDR } = process.env

mongoose.connect(MONGO_ADDR, { useNewUrlParser: true, useUnifiedTopology: true})
