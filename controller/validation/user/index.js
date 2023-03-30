const { userRegistSchema, userPaymentSchema } = require("./schema");

const validateUserRegist = (payload)=>{
    const validationResult = userRegistSchema.validate(payload);
    if(validationResult.error){
        throw new Error(validationResult.error.message);
    }
} 

const validateUserPayment = (payload)=>{
    const validationResult = userPaymentSchema.validate(payload)
    if(validationResult.error){
        throw new Error(validationResult.error.message);
    }
}

module.exports = {validateUserRegist, validateUserPayment};