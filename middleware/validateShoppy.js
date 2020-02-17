const Crypto = require('crypto')

const { SHOPPY_SECRET } = process.env

const validateShoppy = () => async (req, res, next) => {

  const hmac = Crypto.createHmac('sha512', SHOPPY_SECRET)
  hmac.update(req.rawBuf.toString())
  const hash = hmac.digest('hex')

  if (!(req.headers['x-shoppy-signature'] === hash)) {
    console.log('Invalid shoppy signature!!!')
    res.status(500)
    return res.send()
  }

  return next()
}