'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('paymentDetails',{
      id: {
          type: Sequelize.INTEGER(10),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
      },
      status: {
          type: Sequelize.ENUM('Berhasil', 'Proses', 'Ditolak', 'Unpaid'),
          allowNull: false
      },
      paymentMethod: {
          type: Sequelize.ENUM('BCA', 'Shopee', 'Dana', 'Gopay'),
          allowNull: false,
      },
      numberBankAcc: {
          type: Sequelize.STRING(50),
          allowNull: false
      },
      date: {
          type: Sequelize.DATE(),
          allowNull: false,
      },
      paymentProof: {
          type: Sequelize.STRING,
          allowNull: false
      },
      accountName: {
        type: Sequelize.STRING,
    }, paymentId: {
        type: Sequelize.INTEGER(10),
        allowNull: false
    },userId: {
        type: Sequelize.INTEGER(10),
        allowNull: false
    }})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('paymentDetails');
  }
};
