
const TagsArticles = (sequelize , DataTypes) => {
  return sequelize.define(
    "tags_articles",
    {},
    {
      tableName: "tags_articles",
      timestamps: true,
    }
  );
};

module.exports = TagsArticles;
