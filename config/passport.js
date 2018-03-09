const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = (passport) => {
  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    ((req, email, password, done) => {
      process.nextTick(() => {
        User.findOne({ email })
          .exec()
          .then((user) => {
            if (user) return done(null, false, { message: 'Email is already registered' })

            // if there is no user with that email
            // create the user
            const { name, email, password } = req.body

            User.create({ name, email, password })
              .then((user) => done(null, user))
              .catch((err) => done(err))
          })
          .catch((err) => done(err))
      })
    }),
  ))

  passport.use('local-login', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    ((req, email, password, done) => {
      User.findOne({ email })
        .exec()
        .then((user) => {
          if (!user) return done(null, false, { message: 'Invalid email' })

          // temporary - this will be change with comparing hash password
          if (user.password !== password) return done(null, false, { message: 'Invalid password' })

          return done(null, user)
        })
        .catch((err) => done(err))
    }),
  ))
}
