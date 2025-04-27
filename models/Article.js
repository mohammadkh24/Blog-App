const db = require("../db")

const Article = (sequelize , DataTypes) => {
  return sequelize.define(
    "Article",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
        tableName : "articles",
        timestamps : true
    }
  );
};

module.exports = Article;
