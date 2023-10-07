const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
mongoose.set("strictQuery", true);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },

  email: { type: String },

  password: {
    type: String,
  },

  token: {
    type: String,
  },

  loginReactiveTime: { type: Date },
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, process.env.JWTTOKEN);

  user.token = token;
  return token;
};
UserSchema.pre("save", async function (next) {
  const user = this;
  console.log(user.password);
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
    console.log(user.password);
  }
  return next();
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
