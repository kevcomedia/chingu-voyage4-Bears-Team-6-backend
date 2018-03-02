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

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
