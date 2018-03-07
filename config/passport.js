const passport = require('passport')
const passportJwt = require('passport-jwt')
const User = require('../models/user')

const { ExtractJwt, Strategy: JwtStrategy } = passportJwt
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret', // We should put it to .env
}

passport.use(new JwtStrategy(options, (jwtPayload, done) => {
  User.findById(jwtPayload.id)
    .exec()
    .then((user) => {
      if (user) done(null, user)
      else done(null, false)
    })
    .catch(done)
}))
