var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MeetingSchema = new Schema({
  interests: { type: Schema.Types.ObjectId, ref: 'Interest' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  leader: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  address: String,
  geolocation: {
    longtitude: Number,
    latitute: Number
  },
  contact: String
});

var MeetingModel = mongoose.model('Meeting', MeetingSchema)

modules.exports = MeetingModel
