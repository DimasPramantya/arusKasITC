const Sequelize = require('sequelize');

//import database connection 
const sequelize = require('../util/database');

//create the model
const Validation = sequelize.define('validations',{
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
    }, userId:{
        type: Sequelize.INTEGER(10),
        allowNull: false
    }},
    {
        timestamps: false,
});
module.exports = Validation;