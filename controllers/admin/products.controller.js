const Product = require("./../../models/Product.model");
const { cloudinaryConfig } = require("./../../helper/cloudinary");
const cloudinary = require("cloudinary");
const fs = require("fs");

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

exports.postProduct = async (req, res) => {
  cloudinaryConfig();
  let { name, price, category, stock, description } = req.body;
  if (!name || name.trim().length <= 0) {
    return res.status(400).send({ err: "Name cannot be empty" });
  }
  if (!description || description.trim().length <= 0) {
    return res.status(400).send({ err: "Description cannot be empty" });
  }
  if (!price || price.trim().length <= 0) {
    return res.status(400).send({ err: "Price cannot be empty" });
  }
  if (!category || category.trim().length <= 0) {
    return res.status(400).send({ err: "Category cannot be empty" });
  }
  if (!stock || stock.trim().length <= 0) {
    return res.status(400).send({ err: "Stock cannot be empty" });
  }
  if (!req.files || !req.files.length) {
    return res.status(400).json({ err: "Missing Images" });
  }

  const images = [];
  const imgKeys = Object.keys(req.files);
  imgKeys.forEach((key) => {
    images.push(req.files[key]);
  });

  const publicIds = [];
  const imageArr = [];
  for (let img of images) {
    const path = img.path;
    const upload = await cloudinary.v2.uploader.upload(path);
    fs.unlinkSync(path);
    publicIds.push(upload.public_id);
    imageArr.push(upload.secure_url);
  }

  try {
    const product = new Product({
      name,
      price,
      category,
      stock,
      description,
      images: imageArr,
      publicIds,
    });
    const data = await product.save();
    return res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.updateProductById = async (req, res) => {
  cloudinaryConfig();
  const { id } = req.params;
  const publicId = [];
  const imageArr = [];
  const images = [];
  let { name, price, category, stock, description, image } = req.body;

  if (!name || name.trim().length <= 0) {
    return res.status(400).send({ err: "Name cannot be empty" });
  }
  if (!description || description.trim().length <= 0) {
    return res.status(400).send({ err: "Description cannot be empty" });
  }
  if (!price || price.trim().length <= 0) {
    return res.status(400).send({ err: "Price cannot be empty" });
  }
  if (!category || category.trim().length <= 0) {
    return res.status(400).send({ err: "Category cannot be empty" });
  }
  if (!stock || stock.trim().length <= 0) {
    return res.status(400).send({ err: "Stock cannot be empty" });
  }

  if (!req.files && image) {
    return res.status(400).json({ err: "Missing Images" });
  }
  if (req.files.length > 0) {
    const imgKeys = Object.keys(req.files);
    imgKeys.forEach((key) => {
      images.push(req.files[key]);
    });
    for (let img of images) {
      const path = img.path;
      const upload = await cloudinary.v2.uploader.upload(path);
      fs.unlinkSync(path);
      publicId.push(upload.public_id);
      imageArr.push(upload.secure_url);
    }
  } else {
    if (typeof image !== "object") {
      image = image.split(",");
    }
    image.forEach((img) => {
      images.push(img);
    });
  }
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).send({ err: "Post not found" });

    if (req.files.length > 0) {
      product.publicIds.forEach(async (id) => {
        await cloudinary.v2.uploader.destroy(id);
      });
    }
    if (name) product.name = name;
    if (price) product.price = price;
    if (category) product.category = category;
    if (description) product.description = description;
    if (stock) product.stock = stock;
    if (req.files.length > 0) {
      product.images = imageArr;
      product.publicIds = publicId;
    } else {
      product.images = images;
    }

    const data = await product.save();
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.deleteProductById = async (req, res) => {
  cloudinaryConfig();
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });
    if (!product) return res.status(404).send({ err: "Product not found" });
    product.publicIds.forEach(async (key) => {
      await cloudinary.v2.uploader.destroy(key);
    });
    await Product.findByIdAndDelete(id);
    return res.status(200).send({ msg: "Product deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
