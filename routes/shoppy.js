const express = require('express')
const router = express.Router()
const Orders = require('../db/models/orders')

router.route('/')
  .post(async (req, res) => {
    // Get params from req body
    const data = req.body.json()
    console.log(data)

    try {
      const newOrder = await Orders.create({
        orderId: orderId,
        discordUserID: null,
        price: price

      })
      res.json({'order': {
        'orderId': orderId,
        'discordUserId': null,
        'price': 10,
        'itemName': 'item',
        'complete': false
      }})
    } catch (error) {
      if (error.code === 11000) {
        res.json({
          'error': 'duplicate order ID'
        })
      }
    }
  })

module.exports = router
