const { body } = require("express-validator");

const loginValidator = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long.")
    .trim()
    .escape(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .escape(),

  body("captcha").isString().isLength({ max: 4 })

//   body("uuid").isString().isEmpty("uuid is not empty"),
];

module.exports = loginValidator;
