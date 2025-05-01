"use strict";

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

      await queryInterface.createTable("tags_articles", {
        article_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "articles", 
            key: "id",
          },
          onDelete: "CASCADE",
        },

        tags_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          references: {
            model: "tags", // مدل tags که با id در ارتباط است
            key: "id",
          },
          onDelete: "CASCADE",
        },
        
      });

      await queryInterface.addConstraint("tags_articles", {
        fields: ["article_id", "tags_id"], 
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
      await transAction.rollback();
      throw error;
    }
  },
};
