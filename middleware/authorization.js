const JWT = require('jsonwebtoken');
const Users = require('../db/models/users')

const { APP_JWT_SECRET } = process.env;

const authorize = () => async (req, res, next) => {
  // If auth header exists, check if valid
  if (req.headers.hasOwnProperty('authorization')) {
    const token = req.headers.authorization
    try {
      // Decode JWT and get ID from Mongo
      const jwt = JWT.verify(token, APP_JWT_SECRET)
      const user = await Users.findOne({'discordId': jwt.id})
      if (user != null) {
        // If user exists, they are allowed to access
        // (Only user's in Mongo are manually added users)
        req.user = user
      }
    } catch (error) {
      // Maybe return smth to tell client to clear
      // local storage and prompt user to log in?
      console.log('Invalid token')
    }
  }
  next()
}

module.exports = authorize;