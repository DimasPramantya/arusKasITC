require('dotenv').config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');
const { Op } = require("sequelize");

const User = require("../../models/User");
const Role = require("../../models/Role");
const Validation = require('../../models/Validation');
const { validateUserRegist, validateUserPayment } = require('../validation/user');
const PaymentDetail = require('../../models/PaymentDetail');
const Payment = require('../../models/Payment');

//handler create user
const handlerRegister = async(req,res,next)=>{
    try {
        validateUserRegist(req.body);
        //take the data from request body
        const {email, password, fullName, division, profilePict} = req.body;

        //validate the email, return err msg if email already exist
        const emailCheck = await User.findOne({
            where: {
                email: email
            }
        })
        if (emailCheck) {
            throw new Error(`${emailCheck.email} has been registered`);
        }
        
        //hash the password
        const hashPassword = await bcrypt.hash(password, 8);

        //Set default role as member
        const member = await Role.findOne({
            where: {
                roleName: 'member'
            }
        })

        //insert query
        const user = await User.create({
            email,
            password: hashPassword,
            fullName,
            division,
            profilePict,
            roleId : member.id
        });

        res.status(200).json({
            status: "Success",
            message: "Create User Success",
            data : {
                id: user.id,
                fullName,
                division
            }
        })   
    } catch (error) {
        next(error);
    }
}



//handler delete user
const handlerDeleteUser = async(req,res,next)=>{
    try {
        //take user id from url
        const { id } = req.params;

        //search the user with the id
        const target = await User.findOne({
            where: {
                id: id
            }
        })

        //throw error if user didnot exist
        if(target===null){
            throw new Error(`user with id ${id} don't exist`)
        }

        //delete selected user
        target.destroy();
    } catch (error) {
        next(error);
    }
}

//login user
const handlerLoginUser = async (req,res,next)=>{
    try {
        //take the data from request body
        const {email, password} = req.body;

        //validate the email and password
        const userLogin = await User.findOne({
            where: {
                email: email
            }
        })
        if(!userLogin){
            throw new Error(`Wrong email or password`);
        }
        const passValidation = bcrypt.compareSync(password, userLogin.password);
        if (!passValidation) {
            throw new Error(`Wrong email or password`);
        }

        //create token
        const accessToken = jwt.sign({id: userLogin.id, fullName: userLogin.fullName, division: userLogin.division}, process.env.ACCESS_SECRET_KEY, {expiresIn: '1y'});

        res.json({
            accessToken
        })
    }
    catch (error) {
        next(error)
    }
}

const handlerDashboardUser = async(req,res,next)=>{
    //get data who logged in
    const currUser = await User.findOne({
        where:{
            id: req.user.id
        }
    })

    //get user's payment which status is unpaid
    let unpaidPayment = await PaymentDetail.findAll({
        where:{
            status: "Unpaid",
            userId: currUser.id
        }
    })
    unpaidPayment.forEach(async(e)=>{
        let payment = await Payment.findOne({
            where:{
                id: e.paymentId
            }
        })
        if(payment.name!==null){
            e.dataValues.paymentName = payment.name
            e.dataValues.paymentPrice = payment.price
        }
    })
    
    //get user's payment which already payed or still on process
    let historyPayment = await PaymentDetail.findAll({
        where:{
            status: {
                [Op.ne]: "Unpaid"
            },
            userId: currUser.id
        }
    })
    historyPayment.forEach(async(e)=>{
        let payment = await Payment.findOne({
            where:{
                id: e.paymentId
            }
        })
        if(payment.name!==null){
            e.dataValues.paymentName = payment.name
            e.dataValues.paymentPrice = payment.price
        }
    })

    res.json({
        fullName: currUser.fullName,
        division: currUser.division,
        profilePict: currUser.profilePict,
        unpaidPayment,
        historyPayment
    })
}

const handlerHistoryPayment = async(req,res,next)=>{
    const currUser = await User.findOne({
        where:{
            id: req.user.id
        }
    })
    //get user's payment which already payed or still on process
    let historyPayment = await PaymentDetail.findAll({
        where:{
            status: {
                [Op.ne]: "Unpaid"
            },
            userId: currUser.id
        }
    })
    historyPayment.forEach(async(e)=>{
        let payment = await Payment.findOne({
            where:{
                id: e.paymentId
            }
        })
        if(payment.name!==null){
            e.dataValues.paymentName = payment.name
            e.dataValues.paymentPrice = payment.price
        }
    })

    res.json({
        fullName: currUser.fullName,
        division: currUser.division,
        profilePict: currUser.profilePict,
        historyPayment
    })
}

const handlerUnpaidPayment = async(req,res,next)=>{
    const currUser = await User.findOne({
        where:{
            id: req.user.id
        }
    })

    //get user's payment which status is unpaid
    let unpaidPayment = await PaymentDetail.findAll({
        where:{
            status: "Unpaid",
            userId: currUser.id
        }
    })
    unpaidPayment.forEach(async(e)=>{
        let payment = await Payment.findOne({
            where:{
                id: e.paymentId
            }
        })
        if(payment.name!==null){
            e.dataValues.paymentName = payment.name
            e.dataValues.paymentPrice = payment.price
        }
    })

    res.json({
        fullName: currUser.fullName,
        division: currUser.division,
        profilePict: currUser.profilePict,
        unpaidPayment
    })
}

const handlerPayTheBill = async(req,res,next)=>{
    try {
        const {paymentId:paymentDetailId} = req.params;
        validateUserPayment(req.body);
        const {paymentMethod,paymentProof,numberBankAcc,accountName} = req.body;
        const theBill = await PaymentDetail.findOne({
            where:{
                id: paymentDetailId
            }
        })
        if(!theBill){
            throw new Error("Bill not found")
        }else{
            await theBill.update({
                paymentMethod,paymentProof,numberBankAcc,accountName,
                status: "Proses"
            })
        }
        res.json({
            status: theBill.status,
            paymentMethod,
            numberBankAcc,
            accountName,
            date: theBill.updatedAt
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handlerRegister, 
    handlerDeleteUser, 
    handlerLoginUser, 
    handlerDashboardUser, 
    handlerHistoryPayment,
    handlerUnpaidPayment,
    handlerPayTheBill
};