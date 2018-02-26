var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var InterestSchema = new Schema({
  name: { type: String, required: true }
});

var InterestModel = mongoose.model('Interest', InterestSchema)

module.exports = InterestModel
