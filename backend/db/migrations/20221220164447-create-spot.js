"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Spots", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            ownerId: {
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            state: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            country: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            type: {
                type: Sequelize.STRING,
            },
            petFriendly: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            lat: {
                type: Sequelize.FLOAT,
            },
            lng: {
                type: Sequelize.FLOAT,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            amenities: {
                type: Sequelize.STRING,
            },
            bedroom: {
                type: Sequelize.INTEGER,
            },
            bed: {
                type: Sequelize.INTEGER,
            },
            bath: {
                type: Sequelize.INTEGER,
            },
            guests: {
                type: Sequelize.INTEGER,
            },
            price: {
                type: Sequelize.INTEGER,
            },
            previewImg: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Spots");
    },
};
