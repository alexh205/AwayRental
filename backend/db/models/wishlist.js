'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WishList.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'Owner',
      });

      WishList.hasMany(models.Spot, {
        foreignKey: 'spotId',
      });
    }
  }
  WishList.init(
    {
      title: DataTypes.STRING,
      ownerId: DataTypes.INTEGER,
      spotId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'WishList',
    }
  );
  return WishList;
};
