const { Schema, model, Types } = require('mongoose');

const MessageSchema = new Schema({
  author: { type: Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  sendAt: { type: Date, default: new Date() },
  readAt: { type: Date, required: false },
});

const ChatSchema = new Schema(
  {
    users: {
      type: [Types.ObjectId],
      required: true,
      ref: 'User',
    },
    messages: { type: [MessageSchema], required: false },
    createdAt: { type: Date, default: new Date() },
  },
  { collection: 'chats' },
);

const ChatModel = model('Chat', ChatSchema);

module.exports = ChatModel;
