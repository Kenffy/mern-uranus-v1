const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    description: {
      type: String
    },
    birthday: {
      type: String
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profile: {
      type: String,
      default: "",
    },
    cover: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      max: 50,
    },
    website: {
      type: String
    },
    categories: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: []
    },
    networks: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
