const Product = require("./../models/Product.model");

exports.getProducts = async (req, res) => {
  try {
    const data = await Product.find().populate("user").sort({
      createdAt: -1,
    });
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id })
      .populate("category")
      .populate("user");
    if (!product) return res.status(404).send({ err: "Product not found" });
    return res.status(200).json({ data: product });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.getRelatedProducts = async (req, res) => {
  const { id, categoryId } = req.params;
  try {
    const product = await Product.findOne({ _id: id });
    if (!product) return res.status(404).send({ err: "Products not found" });
    const data = await Product.find({
      category: categoryId,
      _id: { $ne: id },
    })
      .sort({
        createdAt: -1,
      })
      .limit(6);
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.postProduct = async (req, res) => {
  const { name, price, description, category, img } = req.body;
  try {
    const product = new Product({
      name,
      price,
      description,
      category,
      img,
      user: req.user._id,
    });
    const data = await product.save();
    return res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, img } = req.body;
  try {
    const product = await Product.findOne({ _id: id });
    if (!product) return res.status(404).send({ err: "Product not found" });
    if (req.user._id !== product.user)
      return res.status(409).send({ err: "Not authorized" });
    product.name = name;
    product.price = price;
    product.description = description;
    product.category = category;
    product.img = img;
    const data = await product.save();
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.deleteProductById = async (req, res) => {
  const { userId, id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });
    if (!product) return res.status(404).send({ err: "Product not found" });
    if (req.user._id != userId)
      return res.status(403).send({ err: "Not authorized" });
    await Product.findByIdAndDelete(id);
    return res.status(200).send({ msg: "Product deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.getProductsBySearchTerm = async (req, res) => {
  const { term } = req.params;
  if (!term.trim()) return res.status(200).json({ data: [] });
  try {
    const data = await Product.find({ $text: { $search: term } });
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.getProductByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Product.find({ where: { category: id } }).sort({
      orderBy: -1,
    });
    return res.status(200).json({ data });
  } catch (err) {}
};
