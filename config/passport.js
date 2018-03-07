const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = (passport) => {
  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    ((req, email, password, done) => {
      process.nextTick(() => {
        User.findOne({ email }, (err, user) => {
          if (err) {
            return done(err)
          }

          if (user) {
            return done(null, false, { message: 'Email already exist' })
          }

          // if there is no user with that email
          // create the user
          const newUser = new User()

          // set the user's local credentials
          newUser.name = req.body.name
          newUser.email = email
          newUser.password = password

          // save the user
          newUser.save((err) => {
            if (err) { throw err }
            return done(null, newUser)
          })
        })
      })
    })
  ))
  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  passport.use('local-login', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    ((req, email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err)
        }

        if (!user) { return done(null, false, { message: 'Invalid email' }) }

        if (user.password !== password) { return done(null, false, { message: 'Invalid password' }) }

        return done(null, user)
      })
    })
  ))
}
