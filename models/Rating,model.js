const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;
