'use strict';
const bcrypt = require('bcryptjs');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users';
    return await queryInterface.bulkInsert(
      options,
      [
        {
          name: 'Demo User',
          email: 'demo@user.io',
          username: 'demoUser',
          hashedPassword: bcrypt.hashSync('password'),
          profileImg:
            'https://images.unsplash.com/photo-1535930749574-1399327ce78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1336&q=80',
        },
        {
          name: 'Nick Johnson',
          email: 'user1@user.io',
          username: 'FakeUser1',
          hashedPassword: bcrypt.hashSync('password2'),
          profileImg: 'https://www.whichfaceisreal.com/realimages/62190.jpeg',
        },
        {
          name: 'Angela Davis',
          email: 'user2@user.io',
          username: 'FakeUser2',
          hashedPassword: bcrypt.hashSync('password3'),
          profileImg:
            'https://www.whichfaceisreal.com/fakeimages/image-2019-02-18_152346.jpeg',
        },
        {
          name: 'Monica Lee',
          email: 'user4@user.io',
          username: 'DemoUser1',
          hashedPassword: bcrypt.hashSync('password4'),
          profileImg: 'https://www.whichfaceisreal.com/realimages/54187.jpeg',
        },

        {
          name: 'Amanda Richard',
          email: 'user5@user.io',
          username: 'Demo-User2',
          hashedPassword: bcrypt.hashSync('password5'),
          profileImg: 'https://www.whichfaceisreal.com/realimages/39784.jpeg',
        },
        {
          name: 'Will Sampson',
          email: 'user6@user.io',
          username: 'Demo-User3',
          hashedPassword: bcrypt.hashSync('password6'),
          profileImg:
            'https://www.whichfaceisreal.com/fakeimages/image-2019-02-17_163556.jpeg',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Users';
    return await queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: ['demoUser', 'FakeUser1', 'FakeUser2'],
        },
      },
      {}
    );
  },
};
