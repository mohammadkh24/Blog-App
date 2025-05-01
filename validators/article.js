const { body } = require("express-validator");

const articleValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 5, max: 256 })
    .withMessage("Title must be at least 5 characters long."),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required.")
    .isLength({ min: 20 })
    .withMessage("Content must be at least 20 characters long."),

  body("tags")
    .customSanitizer((value) => {
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch (err) {
          return value;
        }
      }
      return value;
    })
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error("Tags must be a valid array.");
      }
      const allValid = value.every(
        (tag) => typeof tag === "string" && tag.trim().length > 0
      );
      if (!allValid) {
        throw new Error("Each tag must be a non-empty string.");
      }
      return true;
    }),
];

module.exports = articleValidator;
