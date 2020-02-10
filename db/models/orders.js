const mongoose = require('mongoose')

const { Schema } = mongoose

const OrdersSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  discordUserId: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    required: true
  }
})

const Orders = mongoose.model('Orders', OrdersSchema)

module.exports = Orders