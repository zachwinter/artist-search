const express = require('express')
const app     = express()
const lastfm  = require('last-fm')

/*
 * Last.fm API
 */
const AUTH = {
	key:    'AUTH_KEY',
	secret: 'AUTH_SECRET'
}

const api = new lastfm(AUTH.key, { userAgent: 'Artist Search' })

/*
 * Config
 */
app.use(require('morgan')('combined'))

/*
 * Routes
 */
require('routes.js')(app, api)

/*
 * Server Initialization
 */
app.listen(process.env.PORT || 3333)