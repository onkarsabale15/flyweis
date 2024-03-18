const env = require("dotenv")
env.config();
const mongoose = require("mongoose");
const models = require("../../model/index")
const validator = require("validator")
const validators = require("../../validator/index")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const signUpService = async (body) => {
    try {
        const validation = validators.userValidator.validate(body);
        if (validation.error) {
            return { success: false, status: 400, message: validation.error.details[0].message }
        } else {
            const userExist = await models.User.findOne({$or: [{ email: body.email },{ mobileNumber: body.mobileNumber }]});
            if (!userExist) {
                body.password= await bcrypt.hash(body.password, 10);
                const newUser = new models.User(body)
                if (newUser) {
                    const newWallet = await models.Wallet.create({
                        ofUser: newUser._id,
                        balance: 0,
                        deposit: 0,
                        winning: 0,
                        bonus: 0,
                        transactions: []
                    });
                    if (newWallet) {
                        newUser.wallet = newWallet._id;
                        const savedUser = await newUser.save();
                        if (savedUser) {
                            return { success: true, message: "User created successfully", status: 201, data: savedUser }
                        } else {
                            return { success: false, message: "Unable to save user.", status: 500 }
                        }
                    } else {
                        return { success: false, message: "Unable to create wallet.", status: 500 }
                    }
                } else {
                    return { success: false, message: "Unable to create user.", status: 500 }
                }

            } else {
                return { success: false, message: "User already exist.", status: 409 }
            }
        }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Error occured while signing up", status: 500 }
    }
}
const getUserByIdService = async (userId) => {
    try {
        if (mongoose.Types.ObjectId.isValid(userId)) {
            const user = await models.User.findById(userId);
            if (user) {
                return { success: true, message: "User found", status: 200, data: user }
            } else {
                return { success: false, message: "User not found", status: 404 }
            }
        } else {
            return { success: false, message: "Invalid user id", status: 400 }
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Got Into Error While Getting User By Id", status: 500 }
    }
}

const getWalletByIdService = async (walletId, user) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(walletId)) {
            return { success: false, message: "Invalid wallet id", status: 400 }
        }
        const wallet = await models.Wallet.findById(walletId);
        if (wallet) {
            if (toString(wallet.ofUser) == toString(user._id)) {
                return { success: true, message: "Wallet found", status: 200, data: wallet }
            } else {
                return { success: false, message: "Wallet not found", status: 404 }
            }
        } else {
            return { success: false, message: "Wallet not found", status: 404 }
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Got Into Error While Getting User By Id", status: 500 }
    }
}
const getMyTransactionsService = async (user) => {
    try {
        const wallet = await models.Wallet.findById(user.wallet);
        if (wallet) {
            return { success: true, message: "Transactions found", status: 200, data: wallet.transactions }
        } else {
            return { success: false, message: "Transactions not found", status: 404 }
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Got Into Error While Getting User By Id", status: 500 }
    }
}

const addCashService = async (user, amount) => {
    try {
        const wallet = await models.Wallet.findById(user.wallet);
        if (!Number(amount)) {
            return { success: false, message: "Invalid amount", status: 400 }
        }
        if (wallet) {
            wallet.balance += amount;
            const savedWallet = await wallet.save();
            if (savedWallet) {
                return { success: true, message: "Cash added", status: 200, data: savedWallet }
            } else {
                return { success: false, message: "Cash not added", status: 404 }
            }
        } else {
            return { success: false, message: "Wallet not found", status: 404 }
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Got Into Error While Getting User By Id", status: 500 }
    }
}

const withdrawCashService = async (user, amount) => {
    try {
        const wallet = await models.Wallet.findById(user.wallet);
        if (!Number(amount)) {
            return { success: false, message: "Invalid amount", status: 400 }
        }
        if (wallet) {
            if (wallet.balance >= amount) {
                wallet.balance -= amount;
                const savedWallet = await wallet.save();
                if (savedWallet) {
                    return { success: true, message: "Cash withdrawn", status: 200, data: savedWallet }
                } else {
                    return { success: false, message: "Cash not withdrawn", status: 404 }
                }
            } else {
                return { success: false, message: "Insufficient balance", status: 400 }
            }
        } else {
            return { success: false, message: "Wallet not found", status: 404 }
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Got Into Error While Getting User By Id", status: 500 }
    }
}

const signInService = async (email, password) => {
    try {
        if(validator.isEmail(email)){
            const user = await models.User.findOne({ email });
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY)
                    if (token) {
                        return { success: true, message: "User found", status: 200, data:{token} }
                    }else{
                        return { success: false, message: "Unable to generate token", status: 500 }
                    }
                } else {
                    return { success: false, message: "Invalid password", status: 400 }
                }
            } else {
                return { success: false, message: "User not found", status: 404 }
            }
        }else{
            return { success: false, message: "Invalid email", status: 400 }
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "Got Into Error While Getting User By Id", status: 500 }
    }
}

const userServices = {
    signUpService,
    getUserByIdService,
    getWalletByIdService,
    getMyTransactionsService,
    addCashService,
    withdrawCashService,
    signInService
}
module.exports = userServices;