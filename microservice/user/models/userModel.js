const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, enum: ['default', 'admin'], default: 'default' },
});

// Add a static method to find users by type
userSchema.statics.findByType = function (type) {
  return this.find({ type: type.toLowerCase() }); // Case-insensitive search
};

const User = mongoose.model('User', userSchema);

module.exports = User;
