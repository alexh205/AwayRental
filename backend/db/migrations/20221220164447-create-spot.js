'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Spots',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        ownerId: {
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'Users',
            key: 'id',
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
        description: {
          type: Sequelize.STRING(500),
        },
        type: {
          type: Sequelize.STRING,
        },
        lat: {
          type: Sequelize.FLOAT,
        },
        lng: {
          type: Sequelize.FLOAT,
        },
        title: {
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
        bathroom: {
          type: Sequelize.INTEGER,
        },
        maxGuests: {
          type: Sequelize.INTEGER,
        },
        checkIn: {
          type: Sequelize.STRING,
        },
        checkOut: {
          type: Sequelize.STRING,
        },
        price: {
          type: Sequelize.INTEGER,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots', options);
  },
};
