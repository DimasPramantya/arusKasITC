const Sequelize = require('sequelize');

//import database connection 
const sequelize = require('../util/database');

//create the model
const Role = sequelize.define('roles',{
    id: {
        type: Sequelize.INTEGER(4),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    roleName: {
        type: Sequelize.STRING(),
        allowNull: false
    }},
    {
        timestamps: false,
})

module.exports = Role;