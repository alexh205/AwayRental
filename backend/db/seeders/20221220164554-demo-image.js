"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}
module.exports = {
    async up(queryInterface, Sequelize) {
        options.tableName = "Images";
        return await queryInterface.bulkInsert(
            options,
            [
                {
                    imageableId: 1,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 1,
                    preview: false,
                },
                {
                    imageableId: 1,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 1,
                    preview: false,
                },
                {
                    imageableId: 1,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 1,
                    preview: false,
                },
                {
                    imageableId: 2,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 2,
                    preview: false,
                },
                {
                    imageableId: 2,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 2,
                    preview: false,
                },
                {
                    imageableId: 2,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 2,
                    preview: false,
                },
                {
                    imageableId: 3,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 3,
                    preview: false,
                },
                {
                    imageableId: 3,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 3,
                    preview: false,
                },
                {
                    imageableId: 3,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 3,
                    preview: false,
                },
                {
                    imageableId: 4,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 1,
                    preview: false,
                },
                {
                    imageableId: 4,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 1,
                    preview: false,
                },
                {
                    imageableId: 4,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 1,
                    preview: false,
                },
                {
                    imageableId: 5,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 3,
                    preview: false,
                },
                {
                    imageableId: 5,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 3,
                    preview: false,
                },
                {
                    imageableId: 5,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 3,
                    preview: false,
                },
                {
                    imageableId: 6,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 2,
                    preview: false,
                },
                {
                    imageableId: 6,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 2,
                    preview: false,
                },
                {
                    imageableId: 6,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 2,
                    preview: false,
                },
                {
                    imageableId: 7,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 4,
                    preview: false,
                },
                {
                    imageableId: 7,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 4,
                    preview: false,
                },
                {
                    imageableId: 7,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 4,
                    preview: false,
                },
                {
                    imageableId: 7,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 4,
                    preview: false,
                },
                {
                    imageableId: 8,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 2,
                    preview: false,
                },
                {
                    imageableId: 8,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 2,
                    preview: false,
                },
                {
                    imageableId: 8,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 2,
                    preview: false,
                },
                {
                    imageableId: 9,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 4,
                    preview: false,
                },
                {
                    imageableId: 9,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 4,
                    preview: false,
                },
                {
                    imageableId: 9,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 4,
                    preview: false,
                },
                {
                    imageableId: 9,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 4,
                    preview: false,
                },
                {
                    imageableId: 10,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 3,
                    preview: false,
                },
                {
                    imageableId: 10,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 3,
                    preview: false,
                },
                {
                    imageableId: 10,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 3,
                    preview: false,
                },
                {
                    imageableId: 10,
                    imageableType: "Spot",
                    url: "https://images.pexels.com/photos/15470196/pexels-photo-15470196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    userId: 3,
                    preview: false,
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        options.tableName = "Images";
        return await queryInterface.bulkDelete(options, {});
    },
};
