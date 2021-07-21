const router = require("express").Router();
const controller = require("./../controllers/Category.controller");

router.get("/", controller.getCategories);

router.post("/", controller.postCategory);

router.delete("/:id", controller.delete);

module.exports = router;
