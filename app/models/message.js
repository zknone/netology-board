const { Schema, model, Types } = require('mongoose');

const MessageSchema = new Schema(
  {
    author: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    sentAt: { type: Date, required: true, default: Date() },
    readAt: { type: Date },
    text: {
      type: String,
      required: true,
    },
    messages: { type: [String], required: false },
  },
  { collection: 'messages' },
);

const UserModel = model('Message', MessageSchema);

module.exports = UserModel;
