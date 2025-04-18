"use strict";

const { Reference } = require("yup");
const { sequelize } = require("../models3");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transAction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn("articles", "author_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },

        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("tags_articles", {
        article_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          Reference: {
            model: "articles",
            key: "id",
          },

          onDelete: "CASCADE",
        },
      });
      await queryInterface.addColumn("tags_articles", {
        tags_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          Reference: {
            model: "tags",
            key: "id",
          },

          onDelete: "CASCADE",
        },
      });

      await queryInterface.addConstraint("tags_articles", {
        fields: ["article_id", "tag_id"],
        type: "unique",
        name: "unique_article_tag",
      });

      await transAction.commit();
    } catch (error) {
      await transAction.rollback();
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {
    const transAction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn("articles", "author_id");
      await queryInterface.dropTable("tags_articles");
      await transAction.commit();
    } catch (error) {
      transAction.rollback();
      throw error;
    }

    await queryInterface.dropTable("relations");
  },
};
