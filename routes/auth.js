const express = require("express");
const controller = require("../controllers/auth");
const validator = require("../validators/auth");
const loginValidator = require("../validators/login");
const validate = require("../middlewares/validate");
const passport = require("passport");

const router = express.Router();

router.route("/register").post(validator, validate, controller.register);
router.route("/login").post(loginValidator, validate, passport.authenticate('local' , {session : false}),controller.login);

module.exports = router;
