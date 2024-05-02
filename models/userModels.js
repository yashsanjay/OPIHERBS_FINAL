const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  phone: {
    type: Number,
    required: [true, "Number is require"],
  },
  district: {
    type: String,
    required: [true, "district is require"],
  },
  age: {
    type: Number,
    required: [true, "Age is require"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notifcation: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
});

// Indexes
// Index on _id field (default index)

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
