const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, min: 3 },
    lastName: { type: String, required: true, min: 3 },
    username: { type: String, unique: true, required: true, min: 6 },
    email: { type: String, unique: true, required: true },
    password: { type: String, min: 6, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema, "users");
