const express = require("express");
const controller = require("../controllers/article");
const validator = require("../validators/article");
const validate = require("../middlewares/validate");

const router = express.Router();

router.route("/").post(validator, validate, controller.create);

module.exports = router;
