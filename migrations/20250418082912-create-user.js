"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      name: {
        Types: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        Types: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        Types: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        Types: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        Types: Sequelize.ENUM,
        values: ["User", "Admin"],
        allowNull: true,
        default: "User",
      },
      provider: {
        Types: Sequelize.ENUM,
        values: ["google", "local"],
        allowNull: false,
        default: "local",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
