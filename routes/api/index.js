const express = require('express')
const passport = require('passport')
const usersRoute = require('./users')

const router = express.Router()

router.use('/users', passport.authenticate('jwt', { session: false }), usersRoute)

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
