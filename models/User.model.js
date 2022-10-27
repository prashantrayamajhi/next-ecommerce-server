const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  // isActivated: {
  //   type: Boolean,
  //   default: false,
  // },
  isBanned: {
    type: Boolean,
    default: false,
  },
  roles: {
    type: String,
    enum: ["user", "admin", "seller"],
    default: "user",
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
    next();
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
