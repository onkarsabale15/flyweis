const services = require("../../service/index")
const sendOtp = async(req,res)=>{
    try {
        const {mobileNumber} = req.params;
        const otpSent = await services.authServices.handleSendOtp(mobileNumber);
        if(otpSent.success){
            res.json({type:true, message:otpSent.message, data:`This is for test purpose only, In production OTP wont be sent in response, The OTP is : ${otpSent.otp}`}).status(otpSent.status);
        }else{
            res.json({type:false, message:otpSent.message}).status(otpSent.status);
        }
    } catch (error) {
        console.log(error);
        res.json({type:false,message:"Got into error while sending otp"}).status(500);
    }
}

const verifyOtp = async(req,res)=>{
    try {
        const {mobileNumber,otp} = req.body;
        const otpVerified = await services.authServices.handleVerifyOtp(mobileNumber,otp);
        if(otpVerified.success){
            res.json({type:true, message:otpVerified.message, token:otpVerified.token}).status(otpVerified.status);
        }else{
            res.json({type:false, message:otpVerified.message}).status(otpVerified.status);
        }
    } catch (error) {
        console.log(error);
        res.json({type:"error",message:"Got into error while verifying otp"}).status(500);
    }
}
const authController = {
    sendOtp,
    verifyOtp
}
module.exports = authController;