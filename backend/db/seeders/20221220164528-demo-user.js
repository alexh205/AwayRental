"use strict";
const bcrypt = require("bcryptjs");
module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.bulkInsert(
            "Users",
            [
                {
                    firstName: "Demo",
                    lastName: "User",
                    email: "demoi@user.io",
                    username: "demoUser",
                    hashedPassword: bcrypt.hashSync("password"),
                    profileImg:
                        "https://www.whichfaceisreal.com/realimages/68259.jpeg",
                },
                {
                    firstName: "Nick",
                    lastName: "Johnson",
                    email: "user1@user.io",
                    username: "FakeUser1",
                    hashedPassword: bcrypt.hashSync("password2"),
                    profileImg:
                        "https://www.whichfaceisreal.com/realimages/62190.jpeg",
                },
                {
                    firstName: "Angela",
                    lastName: "Davis",
                    email: "user2@user.io",
                    username: "FakeUser2",
                    hashedPassword: bcrypt.hashSync("password3"),
                    profileImg:
                        "https://www.whichfaceisreal.com/fakeimages/image-2019-02-18_152346.jpeg",
                },
                {
                    firstName: "Monica",
                    lastName: "Lee",
                    email: "user4@user.io",
                    username: "DemoUser1",
                    hashedPassword: bcrypt.hashSync("password4"),
                    profileImg:
                        "https://www.whichfaceisreal.com/realimages/54187.jpeg",
                },

                {
                    firstName: "Amanda",
                    lastName: "Richard",
                    email: "user5@user.io",
                    username: "Demo-User2",
                    hashedPassword: bcrypt.hashSync("password5"),
                    profileImg:
                        "https://www.whichfaceisreal.com/realimages/39784.jpeg",
                },
                {
                    firstName: "Will",
                    lastName: "Sampson",
                    email: "user6@user.io",
                    username: "Demo-User3",
                    hashedPassword: bcrypt.hashSync("password6"),
                    profileImg:
                        "https://www.whichfaceisreal.com/fakeimages/image-2019-02-17_163556.jpeg",
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        const Op = Sequelize.Op;
        return await queryInterface.bulkDelete(
            "Users",
            {
                username: {
                    [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"],
                },
            },
            {}
        );
    },
};
