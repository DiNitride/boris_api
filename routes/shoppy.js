const express = require('express')
const router = express.Router()
const Orders = require('../db/models/orders')
const Crypto = require('crypto')

const { SHOPPY_SECRET } = process.env

router.route('/')
  .post(async (req, res) => {
    console.log('Webhook from shoppy!')

    const hmac = Crypto.createHmac('sha512', SHOPPY_SECRET)
    hmac.update(req.rawBuf.toString())
    const hash = hmac.digest('hex')

    if (!(req.headers['x-shoppy-signature'] === hash)) {
      console.log('Invalid shoppy signature!!!')
      res.status(500)
      res.send()
      return
    }

    try {
      await Orders.init()
      const newOrder = await Orders.create({
        orderId: req.body.data.order.id,
        discordUserID: null,
        price: req.body.data.product.price,
        itemName: req.body.data.product.title,
        complete: false
      })
      console.log('Added new order to DB')
    } catch (error) {
      if (error.code == 11000) {
        console.log('Duplicate order ID!')
      } else {
        console.log('Error processing webhook from shoppy')
      }
    }
    res.status(200)
    res.send()
  })

module.exports = router
