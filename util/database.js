const Sequelize = require('sequelize');

//connect to database
const sequelize = new Sequelize("aruskas", "root", "", {dialect:"mysql", host:"localhost"});

module.exports = sequelize