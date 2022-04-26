const express = require('express')
const routers = express.Router()

const movies = require('./movies')
const bookings = require('./bookings')
const schedules = require('./schedules')
const users = require('./users')
const auth = require('./auth')

routers.use('/movies', movies)
routers.use('/bookings', bookings)
routers.use('/schedules', schedules)
routers.use('/users', users)
routers.use('/auth', auth)

module.exports = routers
