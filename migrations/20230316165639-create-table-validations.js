'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('validations',{
      id: {
          type: Sequelize.INTEGER(10),
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
      },
      token: {
          type: Sequelize.STRING,
          allowNull: false
      },
      expiredDate: {
          type: Sequelize.DATE(),
          allowNull: false,
      },
      userId:{
        type:Sequelize.INTEGER(10),
        allowNull: false
      }
    },
    {
        timestamps: false,
})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('validations')
  }
};
