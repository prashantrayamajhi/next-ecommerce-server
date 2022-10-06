const router = require("express").Router();
const controller = require("./../controllers/product.controller");

router.get("/", controller.getProducts);

router.get("/:id", controller.getProductById);

router.get("/search/:term", controller.getProductsBySearchTerm);

router.get("/caegory/:id", controller.getProductByCategory);

router.get("/related/:id/:categoryId", controller.getRelatedProducts);

module.exports = router;
