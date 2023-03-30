'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('roles',{
      id: {
          type: Sequelize.INTEGER(4),
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
      },
      roleName: {
          type: Sequelize.STRING(),
          allowNull: false
      } },
      {
          timestamps: false,
  })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  }
};
