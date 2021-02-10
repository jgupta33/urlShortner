const mongoose = require("mongoose");
const shortid = require("short-uuid");

const UrlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  hash: { type: String, required: true, default: shortid.uuid() },
});

module.exports = mongoose.model("url", UrlSchema);