const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  logoUrl: String,
});

module.exports = mongoose.model("Company", schema);
