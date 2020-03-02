const express = require('express');
const fetch = require('node-fetch')
const router = express.Router();
const Users = require('../db/models/users')
const JWT = require('jsonwebtoken')

const { REDIRECT_URL, DISCORD_TOKEN_URL, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, APP_JWT_SECRET } = process.env
const auth_url = 'https://discordapp.com/api/oauth2/authorize'
const discord_url = 'https://discordapp.com/api/v7/users/@me'


router.get('/authenticate', async (req, res, next) => {
  const url = new URL(auth_url)
  const params = new URLSearchParams()
  params.append('client_id', '173708503796416512')
  params.append('response_type', 'code')
  params.append('scope', 'identify')
  params.append('redirect_uri', encodeURI(REDIRECT_URL))
  url.search = params
  res.status(301)
  res.set('Location', url.href)
  res.send()
})

router.get('/authorize', async (req, res, next) => {
  const code = req.query.code

  const data = new URLSearchParams()
  data.append('code', code)
  data.append('redirect_uri', REDIRECT_URL)
  data.append('client_id', DISCORD_CLIENT_ID)
  data.append('client_secret', DISCORD_CLIENT_SECRET)
  data.append('grant_type', 'authorization_code')
  data.append('scope', 'identity')

  const tokenResp = await fetch(DISCORD_TOKEN_URL, {method: 'POST', body: data})
  const tokenJson = await tokenResp.json()
  
  // Get the user's Discord ID
  // Only need to access this once so fuck saving the access and refresh token
  const resp = await fetch(discord_url, { headers: {'Authorization': tokenJson['token_type'] + ' ' + tokenJson['access_token']}})
  const respJson = await resp.json()

  // Create our JWT token to return to the user
  const jwt = JWT.sign({id: respJson.id}, APP_JWT_SECRET, {})
  
  res.status(301)
  res.set('Location', '/?token=' + jwt)
  res.send()
  

})

module.exports = router;
