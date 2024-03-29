'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'Owner',
      });

      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
      });
      Spot.hasMany(models.Image, {
        foreignKey: 'imageableId',
        as: 'SpotImages',
        constraints: false,
        onDelete: 'CASCADE',
        scope: {imageableType: 'Spot'},
      });
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
      });
      Spot.belongsToMany(models.WishList, {
        through: 'SpotWishList',
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
      });
    }
  }
  Spot.init(
    {
      ownerId: {type: DataTypes.INTEGER},
      address: {type: DataTypes.STRING},
      city: {type: DataTypes.STRING},
      state: {type: DataTypes.STRING},
      country: {type: DataTypes.STRING},
      description: {
        type: DataTypes.STRING(1000),
        validate: {
          len: [6, 1000],
        },
      },
      type: {type: DataTypes.STRING},
      lat: {type: DataTypes.FLOAT},
      lng: {type: DataTypes.FLOAT},
      title: {
        type: DataTypes.STRING(250),
        validate: {
          len: [3, 250],
        },
      },
      amenities: {type: DataTypes.STRING(800)},
      bedroom: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
          len: [1, 12],
        },
      },
      bed: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
          let: [1, 24],
        },
      },
      bathroom: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
          len: [1, 12],
        },
      },
      maxGuests: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
        },
      },
      checkIn: {
        type: DataTypes.STRING,
      },
      checkOut: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Spot',
    }
  );
  return Spot;
};
