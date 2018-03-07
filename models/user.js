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

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
