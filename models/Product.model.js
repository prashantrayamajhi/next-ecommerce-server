const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: false,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
      trim: true,
    },
    publicIds: {
      type: [String],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],

    ratings: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Rating",
      },
    ],
  },
  { timestamps: true }
);

ProductSchema.index({ "$**": "text" });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
