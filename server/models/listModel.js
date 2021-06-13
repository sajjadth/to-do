const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    content: { type: String, required: true },
    status: { type: Boolean, require: true, default: false},
  },
  { timestamps: true }
);

const listsSchema = new Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    list: [listSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listsSchema, "lists");
