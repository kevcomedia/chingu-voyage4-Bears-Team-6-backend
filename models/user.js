var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  geolocation: {
    longtitude: Number,
    latitute: Number
  },
  interests: [{
    _id: { type: Schema.Types.ObjectId, ref: 'Interest' },
    wantsToBeLeader: Boolean
  }]
});

var UserModel = mongoose.model('User', UserSchema)

modules.exports = UserModel
