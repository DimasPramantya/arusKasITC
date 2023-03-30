'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        type: Sequelize.INTEGER(10),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name:{
          type: Sequelize.STRING,
          allowNull: false
      },
      price: {
          type: Sequelize.INTEGER(8),
          allowNull: false
      }},
      {
          timestamps: false,
  })
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('payments');
  }
};
