const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
      required: false,
    },
  },
  { collection: 'users' },
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
