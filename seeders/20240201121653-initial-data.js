'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tracks', [{
      id: 1,
      name: '午餐', 
      date: new Date(),
      category: '餐飲食品',
      amount: 120,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tracks', null)
  }
};
