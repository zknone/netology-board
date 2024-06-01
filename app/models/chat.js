const { Schema, model, Types } = require('mongoose');

const ChatSchema = new Schema(
  {
    users: {
      type: [Types.ObjectId],
      required: true,
      ref: 'User',
    },
    messages: { type: [String], required: false },
  },
  { collection: 'chats', timestamps: true },
);

const UserModel = model('Chat', ChatSchema);

module.exports = UserModel;
