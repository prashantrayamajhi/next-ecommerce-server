const User = require("./../models/User.model");
const Products = require("./../models/Product.model");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send({ err: "Profile not found" });
    return res.status(200).json({ data: user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Products.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ data: products });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.updateProfile = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
