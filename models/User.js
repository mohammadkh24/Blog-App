const { Types } = require("mysql2");
const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primarykey: true,
        autoIncrement: true,
      },
      name: {
        Types: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        Types: DataTypes.STRING,
        allowNull: false,
        unique : true
      },
      email: {
        Types: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        Types: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        Types: DataTypes.ENUM,
        values: ["User", "Admin"],
        allowNull: true,
        default: "User",
      },
      provider: {
        Types: DataTypes.ENUM,
        values: ["google", "local"],
        allowNull: false,
        default: "local",
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );
};

module.exports = User;