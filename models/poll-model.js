var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
  author:String,
  title: String,
  options: [{name:String , votes:Number}],
  id: { type: String, unique: true }
});

module.exports = mongoose.model('poll', pollSchema);
