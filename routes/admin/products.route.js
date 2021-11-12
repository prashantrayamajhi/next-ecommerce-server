const router = require("express").Router();
const controller = require("./../../controllers/admin/products.controller");
const passport = require("passport");
const { isAdmin } = require("./../../middlewares/role");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.getProducts
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.postProduct
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.updateProductById
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.deleteProductById
);

module.exports = router;
