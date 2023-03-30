const Sequelize = require('sequelize');

//import database connection 
const sequelize = require('../util/database');
const PaymentDetail = require('./PaymentDetail');

//create the model
const User = sequelize.define('users',{
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
    }, roleId:{
        type: Sequelize.INTEGER(10),
        allowNULL: false
    }},
    {
        timestamps: false,
})

//1 to many relationship between user and paymentDetail
User.hasMany(PaymentDetail);
PaymentDetail.belongsTo(User, {constraints: true, onDelete: "Set Null", onUpdate: "Cascade"});


module.exports = User;