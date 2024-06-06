const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('videogame', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    platforms: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    image: { type: DataTypes.STRING },
    released: { type: DataTypes.DATE },
    rating: { type: DataTypes.FLOAT },
    created: { type: DataTypes.BOOLEAN, defaultValue: true },
  });

};