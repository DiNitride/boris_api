const express = require('express')
const router = express.Router()
const Orders = require('../db/models/orders')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth())

router.get('/', async (req, res) => {
    const orders = await Orders.find({})
    res.json({'orders': orders})
  })

router.get('/open', async (req, res) => {
  const orders = await Orders.find({'complete': false, 'discordUserId': null})
  res.json({'orders': orders})
})

router.get('/in-progress', async (req, res) => {
  const orders = await Orders.find({'complete': false, 'discordUserId': req.user.discordId})
  res.json({'orders': orders})
})

router.get('/complete', async (req, res) => {
  const orders = await Orders.find({'complete': true})
  res.json({'orders': orders})
})

router.get('/incomplete', async (req, res) => {
  const orders = await Orders.find({'complete': false})
  res.json({'orders': orders})
})

router.get('/owned', async (req, res) => {
  const orders = await Orders.find({'discordUserId': req.user.discordId})
  res.json({'orders': orders, 'owned_by': req.user})
})

router.post('/claim/:id', async (req, res) => {

  if (!(await orderExists(req.params.id))) {
    return res.json({'error': 'order_not_found'})
  }

  order = await Orders.findOneAndUpdate(
    {'orderId': req.params.id, 'discordUserId': null},
    {'discordUserId': req.user.discordId},
    {'new': true}
  )

  if (order === null) {
    res.json({'error': 'already_claimed'})
  } else {
    res.json({'order': order})
  }
 
})

router.post('/unclaim/:id', async (req, res) => {

  if (!(await orderExists(req.params.id))) {
    return res.json({'error': 'order_not_found'})
  }

  if (await Orders.findOne({'orderId': req.params.id, 'discordUserId': req.user.discordId, 'complete': true}) !== null) {
    return res.json({'error': 'cannot_unclaim_completed_order'})
  }

  const order = await Orders.findOneAndUpdate(
    {'orderId': req.params.id, 'discordUserId': req.user.discordId},
    {'discordUserId': null},
    {'new': true}
  )
  
  if (order === null) {
    return res.json({'error': 'not_owned'})
  }

  res.json({'order': order})
})

router.post('/complete/:id', async (req, res) => {

  if (!(await orderExists(req.params.id))) {
    return res.json({'error': 'order_not_found'})
  }

  const order = await Orders.findOneAndUpdate(
    {'orderId': req.params.id, 'discordUserId': req.user.discordId},
    {'complete': true},
    {'new': true}
  )
  
  if (order === null) {
    return res.json({'error': 'not_owned'})
  }

  res.json({'order': order})
})

router.post('/uncomplete/:id', async (req, res) => {

  if (!(await orderExists(req.params.id))) {
    return res.json({'error': 'order_not_found'})
  }

  const order = await Orders.findOneAndUpdate(
    {'orderId': req.params.id, 'discordUserId': req.user.discordId},
    {'complete': false},
    {'new': true}
  )
  
  if (order === null) {
    return res.json({'error': 'not_owned'})
  }

  res.json({'order': order})
})


router.get('/:id', async (req, res) => {
  const order = await Orders.findOne({'orderId': req.params.id})
  if (order === null) {
    return res.json({'error': 'order_not_found'})
  } else {
    res.json({'order': order})
  }
  
})

async function orderExists(orderId) {
  let order = await Orders.findOne({'orderId': orderId})

  if (order === null) {
    return false
  } else {
    return true
  }
}

module.exports = router
