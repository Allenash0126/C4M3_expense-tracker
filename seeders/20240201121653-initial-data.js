'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let transaction

    try {
      transaction = await queryInterface.sequelize.transaction()
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
        }
      ],
      { transaction }
      )

      await queryInterface.bulkInsert('Categories', [
        {
          id: 1,
          name: '家居物業',
          icon: 'https://fontawesome.com/icons/home?style=solid',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: '交通出行',
          icon: 'https://fontawesome.com/icons/shuttle-van?style=solid',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: '休閒娛樂',
          icon: 'https://fontawesome.com/icons/grin-beam?style=solid',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: '餐飲食品',
          icon: 'https://fontawesome.com/icons/utensils?style=solid',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: '其他',
          icon: 'https://fontawesome.com/icons/pen?style=solid',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
      await transaction.commit()
    } catch (error) {
      if (transaction) await transaction.rollback()
    }

    // 因為CASCADE, 所以必須先建立(Categories + Users) 才能建立(Tracks)
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
    await queryInterface.bulkDelete('Categories', null)
  }
}
