const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true
    },
    status: {
      type: String, // private, friend, public
      required: true,
      max: 20,
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
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: []
    },
    vues: {
      type: Array,
      default: []
    },
    shares: {
      type: Array,
      default: []
    },
    tags: {
      type: Array,
      default: []
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
