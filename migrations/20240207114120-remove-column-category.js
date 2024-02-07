'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.removeColumn('Tracks', 'category')
  },

  async down (queryInterface, Sequelize) {
    queryInterface.addColumn('Tracks', 'category', {
      type: Sequelize.STRING,
    })
  }
};
