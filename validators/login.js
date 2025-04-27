const { body } = require("express-validator");

const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .escape(),

  body("captcha").isString().isLength({ max: 4 }),

];

module.exports = loginValidator;
