const validator = require("validator")
const models = require("../../model/index")
const env = require("dotenv")
env.config();
const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const generateJwtToken = async (payload) => {
    // console.log("This is payload : ", payload)
    try {
        const token = jwt.sign({payload}, JWT_SECRET_KEY)
        if (token) {
            return { success: true, message: "Token generated successfully", data: token, status: 200 }
        } else {
            return { success: false, message: "Unable To Generate Token", status: 500 }
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error occured while generating jwt token", status: 500 }
    }
}
const handleSendOtp = async (mobileNumber) => {
    try {
        if (validator.isMobilePhone(mobileNumber)) {
            const otp = Math.floor(100000 + Math.random() * 900000);
            const numberExists = await models.otpModel.findOne({ phoneNumber: mobileNumber })
            if (numberExists) {
                const lastOtpSent = numberExists.updatedAt
                if (Date.now() - lastOtpSent < 30000) {
                    let sentAgo = parseInt((Date.now() - lastOtpSent) / 1000);
                    return { success: false, message: `OTP already sent ${sentAgo} seconds ago. Try again after ${30 - sentAgo} seconds.`, status: 400 }
                } else {
                    numberExists.otp = otp;
                    const updated = await numberExists.save();
                    if (updated) {
                        return { success: true, message: "OTP sent successfully. If you dont receive then try to resend after 30 seconds.", otp: otp, status: 200 }
                    } else {
                        return { success: false, message: "Something went wrong. Try again after sometime.", status: 500 }
                    }
                }
            } else {
                const newOtp = models.otpModel.create({
                    phoneNumber: mobileNumber,
                    otp: otp
                })
                if (newOtp) {
                    return { success: true, message: "OTP sent successfully. If you dont receive then try to resend after 30 seconds.", otp: otp, status: 200 }
                } else {
                    return { success: false, message: "Unable to save new otp in DB", status: 500 }
                }
            }
        } else {
            return { success: false, message: "Invalid mobile number", status: 400 }
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Got into error while sending otp", status: 500 }
    }
}

const handleVerifyOtp = async (mobileNumber, otp) => {
    try {
        if (validator.isMobilePhone(mobileNumber) && Number(otp) && (String(otp).length == 6)) {
            const numberExists = await models.otpModel.findOne({ phoneNumber: mobileNumber })
            if (numberExists) {
                const lastOtpSent = numberExists.updatedAt
                if (Date.now() - lastOtpSent > 300000) {
                    return { success: false, message: "OTP expired. the OTP is valid for 5 minutes only please enter new OTP.", status: 400 }
                } else {
                    if (numberExists.otp == otp) {
                        numberExists.otp = 0;
                        await numberExists.save();
                        const user = await models.User.findOne({ mobileNumber: mobileNumber })
                        if (user) {
                            const token = await generateJwtToken(user)
                            if (token.success) {
                                return { success: true, message: "OTP verified successfully", status: 200, token:token.data }
                            } else {
                                return { success: false, message: "Unable to generate token", status: 500 }
                            }
                        } else {
                            return { success: true, message: "OTP verified successfully. Please Proceed With SignUp.", status: 200 }
                        }
                    } else {
                        return { success: false, message: "Invalid OTP", status: 400 }
                    }
                }
            } else {
                return { success: false, message: "Number not registered, Please SignUp First.", status: 400 };
            }
        } else {
            return { success: false, message: "Invalid mobile number", status: 400 };
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Got into error while verifying otp", status: 500 }
    }
}
const authServices = { handleSendOtp, handleVerifyOtp }
module.exports = authServices;