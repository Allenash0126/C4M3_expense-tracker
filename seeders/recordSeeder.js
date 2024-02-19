'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [
        {
          id: 1,
          name: '廣志',
          email: 'user1@example.com',
          password: 'user1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: '小新',
          email: 'user2@example.com',
          password: 'user2',
          createdAt: new Date(),
          updatedAt: new Date()
        },
         {
          id: 3,
          name: '悟空',
          email: 'user3@example.com',
          password: 'user3',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    await queryInterface.bulkInsert('Tracks', [
      {
        id: 1,
        name: '午餐',
        date: new Date(),
        amount: 60,
        userId: 1,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: '晚餐',
        date: new Date(),
        amount: 60,
        userId: 1,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: '捷運',
        date: new Date(),
        amount: 120,
        userId: 1,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: '電影：驚奇隊長',
        date: new Date(),
        amount: 220,
        userId: 2,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: '租金',
        date: new Date(),
        amount: 25000,
        userId: 1,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
  }
}
