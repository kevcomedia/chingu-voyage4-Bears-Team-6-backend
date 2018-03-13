const passport = require('passport')

function localLogin(req, res, next) {
  passport.authenticate('local-login', { session: false }, (err, { user, token }, info) => {
    if (err) return next(err)

    if (!user) return res.status(info.status).send(info)

    req.logIn(user, { session: false }, (err) => {
      if (err) return next(err)

      return res.json({
        message: 'Login Successful',
        token,
      })
    })
  })(req, res, next)
}

function register(req, res, next) {
  passport.authenticate('local-signup', { session: false }, (err, { user, token }, info) => {
    if (err) return next(err)

    if (!user) return res.status(info.status).send(info)

    req.logIn(user, { session: false }, (err) => {
      if (err) return next(err)

      return res.status(201).json({
        message: 'Register Successful',
        token,
      })
    })
  })(req, res, next)
}

module.exports = {
  localLogin,
  register,
}
