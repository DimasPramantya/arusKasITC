const { Op } = require("sequelize");

const Payment = require('../../models/Payment');
const Roles = require('../../models/Role');
const User = require('../../models/User');
const PaymentDetail = require('../../models/PaymentDetail');

const handlerCreatePayment = async(req,res,next)=>{
    try {
        const {name, price} = req.body

        //create the payment
        const newPayment = await Payment.create({
            name, price
        })
    
        //generate the payment for all users
        
            //find role id as member
            const roleMember = await Roles.findOne({
                where:{
                    roleName: "member"
                }
            })
    
            //select all users as member
            const members = await User.findAll({
                where:{
                    roleId: roleMember.id
                }
            })

            if(!members){
                throw new Error("member list is empty!")
            }

            //generate the payment
            members.forEach(async(e)=>{
                await PaymentDetail.create({
                    paymentId: newPayment.id,
                    userId: e.id,
                    status: "Unpaid"
                })
            })

        res.json({
            status: "Generate Payments For All User Success"
        })
    } catch (error) {
        next(error)
    }    
}

const handlerGetAllUserPayments = async(req,res,next)=>{
    try {
        //inner join between paymentDetails, users, payments
        await PaymentDetail.findAll({
            attributes : ["id", "status"],
            include: [{
                model: User,
                attributes: ["fullName"],
                required: true
            },{
                model: Payment,
                attributes: ["name"],
                required: true
            }]
        }).then((result)=>{
            const unpaidUsersPayment = result.filter((e)=>{
                return e.status === "Unpaid" 
            })
            const paidUsersPayment = result.filter((e)=>{
                return e.status !== "Unpaid" 
            })
            res.json({unpaidUsersPayment, paidUsersPayment})
        });
    } catch (error) {
        next(error)
    }
}

module.exports = {handlerCreatePayment, handlerGetAllUserPayments};