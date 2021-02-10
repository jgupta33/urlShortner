const mongoose = require("mongoose");
const uuid = require("uuid");

const UrlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  hash: { type: String, required: true, default: uuid.v4 },
});

module.exports = mongoose.model("url", UrlSchema);