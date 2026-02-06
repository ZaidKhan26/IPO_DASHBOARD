const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: String,
  videoId: String,
  thumbnail: String,
});

module.exports = mongoose.model("Video", VideoSchema);
