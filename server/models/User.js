const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hashHelper, compareHelper } = require('../utilities/bcrypt-helper');

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  // Important: Must await hash result before assignment or else plain text is saved
  const hashedPassword = await hashHelper(this.password);
  this.password = hashedPassword;
});

UserSchema.methods.verifyPassword = function(inputPassword) {
  return compareHelper(inputPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
