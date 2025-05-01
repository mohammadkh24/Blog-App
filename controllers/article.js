const { default: slugify } = require("slugify");
const { Article, Tag, User } = require("../db");
const { where } = require("sequelize");
const { raw } = require("mysql2");

exports.create = async (req, res, next) => {
  try {
    let { title, content, tags } = req.body;

    tags = Array.isArray(tags) ? tags : [tags];

    tags = tags.map((tag) => {
      return Tag.findOrCreate({ where: { title: tag.trim() } });
    });

    tags = await Promise.all(tags);

    let slug = slugify(title);
    const copyOfSlug = slug;

    let i = 1;
    const coverPatch = `/images/covers/${req.file?.filename}`;

    if (!req.file) {
      return res.status(400).json({
        message: "Cover is empty",
      });
    }

    let article;

    while (!article) {
      try {
        article = await Article.create({
          title,
          content,
          slug,
          author_id: req.user.id,
          cover: coverPatch,
        });

        await article.addTag(tags.map((tag) => tag[0]));

        return res.status(201).json({
          ...article.dataValues,
          tags: tags.map((tag) => tag[0].title),
        });
      } catch (error) {
        if (error.original.code == "ER_DUP_ENTRY") {
          console.log("i :", i);
          slug = `${copyOfSlug}-${i++}`;
        } else {
          throw error;
        }
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//! Fixed bug
exports.getBySlug = async (req, res, next) => {
  const article = await Article.findOne({
    where: {
      slug: req.params.slug,
    },

    attributes: {
      exclude: ["author_id"],
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password"],
        },
        as: "author",
      },

      {
        model: Tag,
        attributes: ["title"],
        through : {
            attributes : []
        },
      },
    ],
  });

  console.log(article);

  return res.json({article });
};
