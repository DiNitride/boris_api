const checkAuth = () => async (req, res, next) => {
  if (!req.user) {
    res.status(401)
    res.set('WWW-Authenticate', 'Please pass a valid auth token in headers')
    return res.send('Unauthorized, no authorization header present')
  }
  next()
}

module.exports = checkAuth
