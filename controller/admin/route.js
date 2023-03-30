const express = require('express');
const authenticationToken = require('../middleware/authToken');
const { handlerCreatePayment, handlerGetAllUserPayments } = require('./handler');
const router = express.Router();

//api create payment for all member
router.post('/create-payment', authenticationToken, handlerCreatePayment);

//api see all user payment list
router.get('/dashboard', authenticationToken, handlerGetAllUserPayments)

module.exports = router;