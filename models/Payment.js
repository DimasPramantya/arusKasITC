const Sequelize = require('sequelize');

//import database connection 
const sequelize = require('../util/database');
const PaymentDetail = require('./PaymentDetail');

//create the model
const Payment = sequelize.define('payments',{
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
//1 to many relationship between payment and paymentDetail
Payment.hasMany(PaymentDetail);
PaymentDetail.belongsTo(Payment, {constraints: true, onDelete: "Cascade", onUpdate: "Cascade"});

module.exports = Payment;