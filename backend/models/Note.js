const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: String,
  createdAt: Date
});

module.exports = mongoose.model("Note", noteSchema);
