const router = require("express").Router();
const controller = require("./../controllers/profile.controller");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.getProfile
);

router.get(
  "/products",
  passport.authenticate("jwt", { session: false }),
  controller.getProducts
);

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.updateProfile
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.deleteProfile
);

module.exports = router;
