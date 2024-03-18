const { default: mongoose } = require("mongoose");
const models = require("../../model/index")
const validator = require("validator")
const signUpService = async (
    // name, email, dateOfBirth, gender, location
) => {
    try {
        const validation = true;
        if (validation) {
            const newUser = new models.User({
                mobileNumber: "8668506258",
                name: {
                    firstName: "Onkar",
                    lastName: "Sabale"
                },
                email: "onkarsabale15@gmail.com",
                dateOfBirth: Date.now(),
                gender: "male",
                location: {
                    country: "India",
                    state: "Maharashtra",
                    city: "Pune"
                }
            })
            if (newUser) {
                const newWallet = await models.Wallet.create({
                    ofUser: newUser._id,
                    balance: 900,
                    deposit: 0,
                    winning: 100,
                    bonus: 0,
                    transactions: [{ to: newUser._id, from: newUser._id, amount: 100, type: "deposit", status: [{ status: "started" }, { status: "pending" }, { status: "completed" }] }]
                });
                if (newWallet) {
                    newUser.wallet = newWallet._id;
                    const savedUser = await newUser.save();
                    if (savedUser) {
                        console.log("User created successfully");
                        console.log(savedUser)
                    }
                }
            }

        } else {
            return { success: false, message: "Validation failed", status: 400 }
        }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Error occured while signing up", status: 500 }
    }
}
const getUserByIdService = async (userId) => {
    try {
        if (validator.isMongoId(userId)) {
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
        if(!mongoose.Types.ObjectId.isValid(walletId)){
            return { success: false, message: "Invalid wallet id", status: 400 }
        }
        const wallet = await models.Wallet.findById(walletId);
        if(wallet){
            if(toString(wallet.ofUser)==toString(user._id)){
                return { success: true, message: "Wallet found", status: 200, data: wallet }
            }else{
                return { success: false, message: "Wallet not found", status: 404 }
            }
        }else{
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
        if(wallet){
            return { success: true, message: "Transactions found", status: 200, data: wallet.transactions }
        }else{
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
        if(!Number(amount)){
            return { success: false, message: "Invalid amount", status: 400 }
        }
        if(wallet){
            wallet.balance += amount;
            const savedWallet = await wallet.save();
            if(savedWallet){
                return { success: true, message: "Cash added", status: 200, data: savedWallet }
            }else{
                return { success: false, message: "Cash not added", status: 404 }
            }
        }else{
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
        if(!Number(amount)){
            return { success: false, message: "Invalid amount", status: 400 }
        }
        if(wallet){
            if(wallet.balance >= amount){
                wallet.balance -= amount;
                const savedWallet = await wallet.save();
                if(savedWallet){
                    return { success: true, message: "Cash withdrawn", status: 200, data: savedWallet }
                }else{
                    return { success: false, message: "Cash not withdrawn", status: 404 }
                }
            }else{
                return { success: false, message: "Insufficient balance", status: 400 }
            }
        }else{
            return { success: false, message: "Wallet not found", status: 404 }
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
    withdrawCashService
}
module.exports = userServices;