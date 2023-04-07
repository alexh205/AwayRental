'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'SpotWishList',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        spotId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Spots',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        wishListId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'WishLists',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      options
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SpotWishList', options);
  },
};
