const Joi = require('joi');

//Registration user schema
const userRegistSchema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email({minDomainSegments:2, tlds:{allow: ['com']}}).required(),
    division: Joi.string().required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,10}$/)).message('Password must contain eight to ten characters, at least one uppercase letter, one lowercase letter and one number').required(),
    confPass: Joi.equal(Joi.ref('password')).options({ messages: { 'any.only': 'confirm password does not match' } })
})

//Payment user Schema
const userPaymentSchema = Joi.object({
    paymentMethod : Joi.string().required(),
    paymentProof: Joi.string().required(),
    numberBankAcc: Joi.string().required(),
    accountName: Joi.string().required()
})

module.exports = {userRegistSchema, userPaymentSchema};