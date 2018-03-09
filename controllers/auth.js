const passport = require('passport')

function localLogin(req, res, next) {
  passport.authenticate('local-login', { session: false }, (err, user, info) => {
    if (err) return next(err)

    if (!user) return res.send(info)

    req.logIn(user, { session: false }, (err) => {
      if (err) return next(err)

      return res.send('Login Successful')
    })
  })(req, res, next)
}

function register(req, res, next) {
  passport.authenticate('local-signup', { session: false }, (err, user, info) => {
    if (err) return next(err)

    if (!user) return res.send(info)

    req.logIn(user, { session: false }, (err) => {
      if (err) return next(err)

      req.body.success = true
      return res.status(201).json(req.body)
    })
  })(req, res, next)
}

module.exports = {
  localLogin,
  register,
}
