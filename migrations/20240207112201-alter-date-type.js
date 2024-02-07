'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('Tracks', 'date', {
      type: Sequelize.DATEONLY
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.changeColumn('Tracks', 'date', {
      type: Sequelize.DATE
    })
  }
}
