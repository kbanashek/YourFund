var mongoose = require('mongoose');


module.exports = mongoose.model('User',{
  name: String,
  email: { type: String, lowercase: true },
  funds: [],
  password:String
});
