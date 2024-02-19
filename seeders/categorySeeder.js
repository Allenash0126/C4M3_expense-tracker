'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Categories', [
        {
          id: 1,
          name: '家居物業',
          icon: '<i class="fa-solid fa-house"></i>',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: '交通出行',
          icon: '<i class="fa-solid fa-van-shuttle"></i>',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: '休閒娛樂',
          icon: '<i class="fa-solid fa-face-grin-beam"></i>',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: '餐飲食品',
          icon: '<i class="fa-solid fa-utensils"></i>',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: '其他',
          icon: '<i class="fa-solid fa-pen"></i>',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null)
  }
}
