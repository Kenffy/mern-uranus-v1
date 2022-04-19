const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
    },
    receiver: {
        type: String,
    },
    message: {
      type: String,
    },
    link: {
      type: String,
    },
    target: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    opened: {
      type: Boolean,
      default: false,
    },
    viewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
