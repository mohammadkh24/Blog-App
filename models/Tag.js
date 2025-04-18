const { DataTypes } = require("sequelize");
const db = require("../db");

const Tag = (sequelize) => {
  return sequelize.define(
    "Tag",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primarykey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "tag",
      timestamps: true,
    }
  );
};

module.exports = Tag;
