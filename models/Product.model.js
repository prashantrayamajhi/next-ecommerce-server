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
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
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
    delivery: {
      type: Boolean,
      required: true,
    },

    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

ProductSchema.index({ "$**": "text" });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
