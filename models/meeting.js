const mongoose = require('mongoose')

const { Schema } = mongoose

const MeetingSchema = new Schema({
  interests: { type: Schema.Types.ObjectId, ref: 'Interest' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  leader: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  address: String,
  geolocation: {
    longtitude: Number,
    latitute: Number,
  },
  contact: String,
})

const MeetingModel = mongoose.model('Meeting', MeetingSchema)

module.exports = MeetingModel
