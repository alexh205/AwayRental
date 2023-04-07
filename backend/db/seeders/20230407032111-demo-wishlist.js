'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'WishList';
    return await queryInterface.bulkInsert(options, [
      {title: 'Spring 2022', userId: 1, spotId: 50},
      {title: 'Spring 2022', userId: 1, spotId: 52},
      {title: 'Spring 2022', userId: 1, spotId: 62},
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'WishList';
    return await queryInterface.bulkDelete(options, {});
  },
};
