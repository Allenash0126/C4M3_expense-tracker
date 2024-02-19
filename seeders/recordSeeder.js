'use strict'
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let transaction

    try {
      transaction = await queryInterface.sequelize.transaction()

      const salt = await bcrypt.genSalt(10)
      const hash1 = await bcrypt.hash('user1', salt)
      const hash2 = await bcrypt.hash('user2', salt)
      const hash3 = await bcrypt.hash('user3', salt)

      await queryInterface.bulkInsert('Users', [
        {
          id: 1,
          name: '廣志',
          email: 'user1@example.com',
          password: hash1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: '小新',
          email: 'user2@example.com',
          password: hash2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: '悟空',
          email: 'user3@example.com',
          password: hash3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      { transaction }
      )
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
      ], { transaction }
      )
      await transaction.commit()
    } catch (error) {
      if (transaction) await transaction.rollback()
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
  }
}
