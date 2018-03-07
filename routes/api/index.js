const express = require('express')
const usersRoute = require('./users')
const authRoute = require('./auth')

const router = express.Router()

router.use('/auth', authRoute)
router.use('/users', usersRoute)

router.use((req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
})

router.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json(err)
})

module.exports = router
