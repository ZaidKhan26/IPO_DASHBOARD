const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  priceBand: String,
  openDate: String,
  closeDate: String,
  issueSize: String,
  issueType: String,
  listingDate: String,
  status: String,
  ipoPrice: Number,
  listingPrice: Number,
  listingGain: Number,
  cmp: Number,
  currentReturn: Number,
  lotSize: Number,
  retailQuota: Number,
  retailSubscription: Number,
  qibSubscription: Number,
  rhpPdf: String,
  drhpPdf: String,
  importantLink: String,
});

module.exports = mongoose.model("IPO", schema);
