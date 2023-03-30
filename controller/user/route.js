const express = require('express');
const authenticationToken = require('../middleware/authToken');
const { handlerRegister, handlerDeleteUser, handlerLoginUser, handlerDashboardUser, handlerHistoryPayment, handlerUnpaidPayment, handlerPayTheBill } = require('./handler');
const router = express.Router();

//Register Create User
router.post('/create-user', handlerRegister);

//Delete User
router.delete('/delete-user/:id', handlerDeleteUser);

//login user
router.post('/login', handlerLoginUser);

//dashboard
router.get('/dashboard', authenticationToken, handlerDashboardUser);

//historyPayment
router.get('/history', authenticationToken, handlerHistoryPayment)

//unpaidPayment
router.get('/bill', authenticationToken, handlerUnpaidPayment);

//user pay the bill
router.put('/payTheBill/:paymentId', authenticationToken, handlerPayTheBill);

module.exports = {userRoute: router};
