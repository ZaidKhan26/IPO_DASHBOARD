const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },

    tags: {
      type: [String],
      default: [],
      index: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    votes: {
      type: Number,
      default: 0,
    },

    answers: {
      type: Number,
      default: 0,
    },

    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Question || mongoose.model("Question", questionSchema);
