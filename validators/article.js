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

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required.")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage(
      "Slug must be URL-friendly (lowercase letters, numbers, hyphens)."
    ),
    
  body("tags")
    .isArray({ min: 1 })

    .custom((tags) => {
      const isValid = tags.every(
        (tag) => typeof tag === "string" && tag.trim() !== ""
      );
      if (!isValid) throw new Error("Each tag must be a non-empty string.");
      return true;
    }),
];

module.exports = articleValidator;
