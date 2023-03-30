'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users',{
      id: {
        type: Sequelize.INTEGER(10),
        allowNULL: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING(50),
        allowNULL: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(),
        allowNULL: false
    },
    fullName: {
        type: Sequelize.STRING(50),
        allowNULL: false
    },
    division: {
        type: Sequelize.ENUM('Mobile', 'Web', 'Human Resource'),
        allowNULL: false
    },
    profilePict: {
        type: Sequelize.STRING(100),
        allowNULL: true
    },
    roleId: {
      type: Sequelize.INTEGER(10),
      allowNull: false
    }
  },
    {
        timestamps: false,
})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
