const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required:true
    },
    postId: {
      type: String,
      required:true
    },
    likes: {
      type: Array,
      default: [],
    },
    replies: {
      type: Array,
      default: [],
    },
    deleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
