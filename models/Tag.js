
const Tag = (sequelize , DataTypes) => {
  return sequelize.define(
    "Tag",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
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
