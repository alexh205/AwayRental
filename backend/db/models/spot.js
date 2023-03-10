"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Spot extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Spot.belongsTo(models.User, {
                foreignKey: "ownerId",
                as: "Owner",
            });

            Spot.hasMany(models.Booking, {
                foreignKey: "spotId",
                onDelete: "CASCADE",
            });
            Spot.hasMany(models.Image, {
                foreignKey: "imageableId",
                as: "SpotImages",
                constraints: false,
                onDelete: "CASCADE",
                scope: { imageableType: "Spot" },
            });
            Spot.hasMany(models.Review, {
                foreignKey: "spotId",
                onDelete: "CASCADE",
            });
        }
    }
    Spot.init(
        {
            ownerId: { type: DataTypes.INTEGER },
            address: { type: DataTypes.STRING },
            city: { type: DataTypes.STRING },
            state: { type: DataTypes.STRING },
            country: { type: DataTypes.STRING },
            type: { type: DataTypes.STRING },
            petFriendly: { type: DataTypes.BOOLEAN },
            lat: { type: DataTypes.FLOAT },
            lng: { type: DataTypes.FLOAT },
            name: { type: DataTypes.STRING },
            amenities: { type: DataTypes.STRING },
            bedroom: {
                type: DataTypes.INTEGER,
                validate: {
                    isNumeric: true,
                },
            },
            bed: {
                type: DataTypes.INTEGER,
                validate: {
                    isNumeric: true,
                },
            },
            bath: {
                type: DataTypes.INTEGER,
                validate: {
                    isNumeric: true,
                },
            },
            guests: {
                type: DataTypes.INTEGER,
                validate: {
                    isNumeric: true,
                },
            },
            price: {
                type: DataTypes.INTEGER,
                validate: {
                    isNumeric: true,
                },
            },
            previewImg: { type: DataTypes.STRING },
        },
        {
            sequelize,
            modelName: "Spot",
        }
    );
    return Spot;
};
