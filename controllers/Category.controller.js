const Category = require("./../models/Category.model");

exports.getCategories = async (req, res) => {
  try {
    const data = await Category.find();
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.postCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const isCategory = await Category.findOne({ name });
    if (isCategory) return res.status(409).send({ err: "Category exists" });
    const categroy = new Category({ name });
    const data = await categroy.save();
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const isCategory = await Category.findOne({ _id: id });
    if (!isCategory) return res.status(404).send({ err: "Category not found" });
    await Category.findByIdAndDelete(id);
    return res.status(200).send({ msg: "Category deleted succesfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
