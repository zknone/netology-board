const ChatModel = require('../models/chat-model');

const Chat = {
  async find([senderId, receiverId]) {
    return await ChatModel.findOne({
      users: { $all: [senderId, receiverId] },
    });
  },

  async sendMessage(socket, msg) {
    try {
      const message = {
        author: msg.senderId,
        text: msg.text,
        sendAt: new Date(),
      };

      let chat = await Chat.find([msg.senderId, msg.receiverId]);

      if (!chat) {
        chat = new ChatModel({
          users: [msg.senderId, msg.receiverId],
          messages: [message],
          createdAt: new Date(),
        });
        await chat.save();
      } else {
        chat.messages.push(message);
        await chat.save();
      }

      socket.to(msg.receiverId).emit('private-message', msg);
    } catch (error) {
      console.error('Error:', error);
    }
  },
};

module.exports = Chat;
