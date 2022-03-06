const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    receiver: {
        type: String,
    },
    message: {
      type: String,
    },
    images: {
      type: Array,
      default: [],
    },
    videos: {
      type: Array,
      default: [],
    },
    audios: {
      type: Array,
      default: [],
    },
    documents: {
      type: Array,
      default: [],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
