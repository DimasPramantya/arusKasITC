const sequelize = require('./database');

const User = require('../models/User');
const Role = require('../models/Role');
const Payment = require('../models/Payment');
const PaymentDetail = require('../models/PaymentDetail');
const Validation = require('../models/Validation');

//1 to many relationship between role and user
Role.hasMany(User);
User.belongsTo(Role, {constraints: true, onDelete: "Set Null", onUpdate: "Cascade"});

//1 to 1 relationship between user and validations
User.hasOne(Validation);
Validation.belongsTo(User, {constraints: true, onDelete: "Cascade", onUpdate: "Cascade"});

//1 to many relationship between user and paymentDetail
User.hasMany(PaymentDetail);
PaymentDetail.belongsTo(User, {constraints: true, onDelete: "Set Null", onUpdate: "Cascade"});

//1 to many relationship between payment and paymentDetail
Payment.hasMany(PaymentDetail);
PaymentDetail.belongsTo(Payment, {constraints: true, onDelete: "Cascade", onUpdate: "Cascade"});

//EXECUTES ONLY 1 TIMES BECAUSE IT WILL OVERWRITTEN THE DATABASE!!!
sequelize.sync({force:true});
