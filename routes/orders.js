const express = require('express')
const router = express.Router()
const Orders = require('../db/models/orders')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth())

router.get('/', async (req, res) => {
    const orders = await Orders.find({})
    res.json(orders)
  })

router.get('/:id', async (req, res) => {
  const order = await Orders.find({'orderId': req.params.id})
  res.json({'order': order})
})


module.exports = router
