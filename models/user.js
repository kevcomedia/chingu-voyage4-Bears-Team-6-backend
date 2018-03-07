const async = require('async')
const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  geolocation: {
    longtitude: Number,
    latitute: Number,
  },
  interests: [{
    _id: { type: Schema.Types.ObjectId, ref: 'Interest' },
    wantsToBeLeader: Boolean,
  }],
})

UserSchema.pre('save', function hashPassword(next) {
  async.waterfall(
    [
      (callback) => {
        bcrypt.genSalt(10, callback)
      },
      (salt, callback) => {
        // eslint-disable-next-line no-invalid-this
        bcrypt.hash(this.password, salt, null, callback)
      },
      (hash, callback) => {
        // eslint-disable-next-line no-invalid-this
        this.password = hash
        callback()
      },
    ],
    next,
  )
})

/**
 * User#isCorrectPassword
 * Accepts a password in plaintext, and returns a Promise that resolves to
 * `true` if the password is indeed the user's password. Resolves to `false`
 * otherwise.
 *
 * Parameters
 * - password (string): the password to check
 * Returns
 * - Promise: resolves to the result of the check
 */
UserSchema.methods.isCorrectPassword = function isCorrectPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, isCorrect) => {
      if (err) {
        reject(err)
      } else {
        resolve(isCorrect)
      }
    })
  })
}

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
