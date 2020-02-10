const mongoose = require('mongoose')

const { Schema } = mongoose

const UsersSchema = new Schema({
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
})

const Users = mongoose.model('Users', UsersSchema)

module.exports = Users