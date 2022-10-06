const router = require("express").Router();
const controller = require("./../../controllers/sellers/products.controller");
const passport = require("passport");
const { isSeller } = require("./../../middlewares/role");
const multer = require("./../../middlewares/multer");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  isSeller,
  controller.getProducts
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isSeller,
  multer.array("image"),
  controller.postProduct
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isSeller,
  multer.array("image"),
  controller.updateProductById
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isSeller,
  controller.deleteProductById
);

module.exports = router;
