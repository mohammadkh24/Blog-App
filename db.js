const { Sequelize } = require("sequelize");
const configs = require("./configs");
const { DataTypes } = require("sequelize");

const db = new Sequelize({
  host: configs.db.host,
  port: configs.db.port,
  username: configs.db.user,
  password: configs.db.password,
  database: configs.db.name,
  dialect: configs.db.dialect,
  logging: configs.isProduction ? false : console.log,
});


const User = require("./models/User")(db, DataTypes);
const Tag = require("./models/Tag")(db, DataTypes);
const Article = require("./models/Article")(db, DataTypes);
const TagsArticles = require("./models/TagsArticles")(db, DataTypes);


User.hasMany(Article, {
  foreignKey: "author_id",
  onDelete: "CASCADE",
});

Article.belongsTo(User, {
  foreignKey: "author_id",
  as: "author",
});

Article.belongsToMany(Tag, {
  through: TagsArticles,
  onDelete: "CASCADE",
  foreignKey: "article_id",
});

Tag.belongsToMany(Article, {
  through: TagsArticles,
  onDelete: "CASCADE",
  foreignKey: "tag_id",
});

module.exports = {db , User , Tag , Article , TagsArticles}