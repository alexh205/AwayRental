'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return await queryInterface.bulkInsert(
      options,
      [
        {
          userId: 2,
          spotId: 1,
          startDate: new Date('2022-10-22'),
          endDate: new Date('2022-10-23'),
          guestsNum: 2,
          price: 89,
          name: 'Nick Johnson',
          phone: '111-111-1111',
        },
        {
          userId: 1,
          spotId: 3,
          startDate: new Date('2022-11-02'),
          endDate: new Date('2022-11-05'),
          guestsNum: 3,
          price: 579,
          name: 'Demo User',
          phone: '444-444-4444',
        },
        {
          userId: 1,
          spotId: 5,
          startDate: new Date('2022-11-07'),
          endDate: new Date('2022-11-09'),
          guestsNum: 1,
          price: 806,
          name: 'Demo User',
          phone: '444-444-4444',
        },
        {
          userId: 3,
          spotId: 2,
          startDate: new Date('2022-11-10'),
          endDate: new Date('2022-11-12'),
          guestsNum: 4,
          price: 386,
          name: 'Angela Davis',
          phone: '908-908-9080',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return await queryInterface.bulkDelete(options, {});
  },
};
