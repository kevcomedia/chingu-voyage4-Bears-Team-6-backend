const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const passportJwt = require('passport-jwt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const { ExtractJwt, Strategy: JwtStrategy } = passportJwt
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'secret', // We should put it to .env
}

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      process.nextTick(() => {
        User.findOne({ email })
          .exec()
          .then((user) => {
            if (user)
              return done(null, false, {
                status: 422,
                message: 'Email is already registered',
              })

            // if there is no user with that email
            // create the user
            const { name, email, password } = req.body

            User.create({ name, email, password })
              .then((user) => {
                const token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey)
                done(null, { user, token })
              })
              .catch((err) => done(err))
          })
          .catch((err) => done(err))
      })
    },
  ),
)

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      User.findOne({ email })
        .exec()
        .then((user) => {
          if (!user)
            return done(null, false, {
              status: 401,
              message: 'Incorrect email',
            })

          user
            .isCorrectPassword(password)
            .then((isCorrect) => {
              const token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey)
              if (isCorrect) return done(null, { user, token })

              return done(null, false, {
                status: 401,
                message: 'Incorrect password',
              })
            })
            .catch((err) => done(err))
        })
        .catch((err) => done(err))
    },
  ),
)

passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    User.findById(jwtPayload.id)
      .exec()
      .then((user) => {
        if (user) done(null, user)
        else done(null, false)
      })
      .catch(done)
  }),
)
