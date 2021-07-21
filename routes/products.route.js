const router = require("express").Router();
const controller = require("./../controllers/products.controller");
const passport = require("passport");

router.get("/", controller.getProducts);

router.get("/:id", controller.getProductById);

router.get("/search/:term", controller.getProductsBySearchTerm);

router.get("/caegory/:id", controller.getProductByCategory);

router.get("/related/:id/:categoryId", controller.getRelatedProducts);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.postProduct
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.updateProductById
);

router.delete(
  "/:userId/:id",
  passport.authenticate("jwt", { session: false }),
  controller.deleteProductById
);

module.exports = router;
