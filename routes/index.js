const express = require('express')
const apiRoute = require('./api')

const router = express.Router()

router.use('/api', apiRoute)

module.exports = router
