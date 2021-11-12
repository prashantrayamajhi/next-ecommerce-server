const router = require("express").Router();
const controller = require("../../controllers/admin/category.controller");
const passport = require("passport");
const { isAdmin } = require("./../../middlewares/role");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.getCategories
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.postCategory
);

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.update
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.delete
);

module.exports = router;
