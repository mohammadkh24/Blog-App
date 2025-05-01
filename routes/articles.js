const express = require("express");
const controller = require("../controllers/article");
const validator = require("../validators/article");
const validate = require("../middlewares/validate");
const passport = require("passport");
const uploaer = require("../uilts/uploader");

const router = express.Router();

router
  .route("/")
  .post(
    passport.authenticate("accessToken", { session: false }),
    uploaer.single("cover"),
    validator,
    validate,
    controller.create
  );

router.route("/:slug").get(controller.getBySlug);

module.exports = router;
