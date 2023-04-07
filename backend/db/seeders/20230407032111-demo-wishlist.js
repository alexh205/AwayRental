'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'WishLists';
    return await queryInterface.bulkInsert(options, [
      {title: 'Spring 2022', ownerId: 1},
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'WishLists';
    return await queryInterface.bulkDelete(options, {});
  },
};
