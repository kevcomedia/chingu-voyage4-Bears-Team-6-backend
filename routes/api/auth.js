const router = require('express').Router()
const authController = require('../../controllers/auth')

router.route('/local-login')
  .post(authController.localLogin)

router.route('/register')
  .post(authController.register)

module.exports = router
