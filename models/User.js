const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  expirationTime: { type: Date, index: { expires: 0 } },
});

module.exports = mongoose.model("User", UserSchema);
