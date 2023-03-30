const Sequelize = require('sequelize');

//import database connection 
const sequelize = require('../util/database');

//create the model
const PaymentDetail = sequelize.define('paymentDetails',{
    id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: Sequelize.ENUM('Berhasil', 'Proses', 'Ditolak', 'Unpaid'),
    },
    paymentMethod: {
        type: Sequelize.ENUM('BCA', 'Shopee', 'Dana', 'Gopay'),
    },
    numberBankAcc: {
        type: Sequelize.STRING(50),
    },
    paymentProof: {
        type: Sequelize.STRING,
    },
    accountName: {
        type: Sequelize.STRING,
    },
    paymentId: {
        type: Sequelize.INTEGER(10),
        allowNull: false
    },userId: {
        type: Sequelize.INTEGER(10),
        allowNull: false
    }
},
)

module.exports = PaymentDetail;