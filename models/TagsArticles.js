const { sequelize } = require("../models3");
const { db } = require("../db");

const TagsArticles = (sequelize) => {
  return db.define(
    "tags_articles",
    {},
    {
      tableName: "tags_articles",
      timestamps: true,
    }
  );
};

module.exports = TagsArticles;
