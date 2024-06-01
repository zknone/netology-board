const { Schema, model, Types } = require('mongoose');

const AdSchema = new Schema(
  {
    shortText: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    tags: {
      type: [String],
      required: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: 'ads',
  },
);

module.exports = model('Ad', AdSchema);
