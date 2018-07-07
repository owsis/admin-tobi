const mongoose = require('mongoose');

//Schema DB
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String, required: true }
}, {
    collection: 't002s'
  });

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUsers = function (callback, limit) {
  User.find(callback).limit(limit);
}