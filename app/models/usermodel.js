const { Schema, model } = require('mongoose');

const AdSchema = new Schema({
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
    }
});

module.exports = model('User', UserSchema);