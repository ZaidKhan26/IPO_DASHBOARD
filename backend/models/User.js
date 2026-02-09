const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },

    password: { type: String, select: false },

    role: { type: String, default: "user" },

    provider: { type: String, default: "local" },

    resetToken: String,
    resetExpire: Date,

    otp: String,
    otpExpiry: Date,

    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
