# boris_api

## Requirements
- MongoDB running somewhere
- NodeJS

## Setup
1. `npm install`
2. `npm start`

## Required env vars
`APP_JWT_SECRET` - Secret used when creating or decoding JWT tokens for the API  
`REDIRECT_URL` - The URL that the Discord OAuth2 flow should redirect back to  
`DISCORD_TOKEN_URL` - The Discord API token endpoint  
`DISCORD_CLIENT_ID` - Client ID of the Discord app used for auth  
`DISCORD_CLIENT_SECRET` - Secret of the Discord app used for auth  
`SHOPPY_SECRET` - Secret from shoppy used to validate webhooks  
`MONGO_ADDR` - The location of the MongoDB (e.g. `mongodb://127.0.0.1/boris`)  
