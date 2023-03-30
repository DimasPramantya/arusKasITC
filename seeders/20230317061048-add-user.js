'use strict';
const bcrypt = require('bcrypt');

const Role = require('../models/Role');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //take role as member data from roles table
    const member = await Role.findOne({
      where: {
        roleName: "member"
      }
    })

    //take role as admin data from roles table
    const admin = await Role.findOne({
      where: {
        roleName: "admin"
      }
    })


    //create user data from table users
   await queryInterface.bulkInsert('users', [{
      email : "rosyid@gmail.com",
      fullName: "rosyid",
      division: "Web",
      password: await bcrypt.hash("Rosyid1234", 8),
      roleId: admin.id
   },{
      email : "dimas@gmail.com",
      fullName: "dimas",
      division: "Web",
      password: await bcrypt.hash("Dimas1234", 8),
      roleId: member.id
   },{
      email : "yuda@gmail.com",
      fullName: "yuda",
      division: "Mobile",
      password: await bcrypt.hash("Yuda1234", 8),
      roleId: member.id
   },{
      email : "rafli@gmail.com",
      fullName: "rafli",
      division: "Human Resource",
      password: await bcrypt.hash("Rafli1234", 8),
      roleId: member.id
   }, ])
  },

  async down (queryInterface, Sequelize) {
    //revert the seed
    await queryInterface.bulkDelete('users', null, {});
  }
};
