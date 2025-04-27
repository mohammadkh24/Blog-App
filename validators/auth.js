const { body } = require("express-validator");

const authValidator = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long.")
    .trim()
    .escape(),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .escape(),

  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),
];

module.exports = authValidator;
