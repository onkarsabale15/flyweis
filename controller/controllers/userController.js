const services = require("../../service/index")
const signUp = async (req, res) => {
    try {
        // const {name, email, dateOfBirth, gender, location} = req.body;
        const user = await services.userServices.signUpService(
            // name, email, dateOfBirth, gender, location
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({ type: false, message: "Error in user signup" })
    }
}

const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await services.userServices.getUserByIdService(userId);
        if (user.success) {
            res.status(200).json({ type: true, message: "User Found", data: user.data })
        } else {
            res.status(user.status).json({ type: false, message: user.message })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ type: false, message: "Got Into Error While Getting User By Id" })
    }
}
const getWalletById = async (req, res) => {
    try {
        const { walletId } = req.params;
        const user = req.user;
        const wallet = await services.userServices.getWalletByIdService(walletId, user);
        if (wallet.success) {
            res.status(200).json({ type: true, message: "Wallet Found", data: wallet.data })
        } else {
            res.status(wallet.status).json({ type: false, message: wallet.message })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ type: false, message: "Got Into Error While Getting User By Id" })
    }
}

const getMyTransactions = async (req, res) => {
    try {
        const user = req.user;
        const transactions = await services.userServices.getMyTransactionsService(user);
        if (transactions.success) {
            res.status(200).json({ type: true, message: "Transactions Found", data: transactions.data })
        } else {
            res.status(transactions.status).json({ type: false, message: transactions.message })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ type: false, message: "Got Into Error While Getting User By Id" })
    }
}

const getMyBalance = async (req, res) => {
    try {
        const user = req.user;
        const wallet = await services.userServices.getWalletByIdService(user.wallet, user);
        if (wallet.success) {
            res.status(200).json({ type: true, message: "Balance Found", data: wallet.data.balance })
        } else {
            res.status(wallet.status).json({ type: false, message: wallet.message })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ type: false, message: "Got Into Error While Fetching the balance." })
    }
}

const getNotifications = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ type: true, message: "Notifications Found", data: user.notifications })
    } catch (error) {
        console.log(error);
        res.status(500).json({ type: false, message: "Got Into Error While Fetching the notifications." })
    }
}

const addCash = async(req,res)=>{
    try {
        const {amount} = req.body;
        const user = req.user;
        const updatedWallet = await services.userServices.addCashService(user, amount);
        if (updatedWallet.success) {
            res.status(200).json({ type: true, message: "Cash Added", data: updatedWallet.data })
        } else {
            res.status(updatedWallet.status).json({ type: false, message: updatedWallet.message })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ type: false, message: "Got Into Error While Adding Cash." })
    }
}
const withdrawCash = async(req,res)=>{
    try {
        const {amount}=req.body;
        const withdraw = await services.userServices.withdrawCashService(req.user, amount);
        if(withdraw.success){
            res.status(200).json({ type: true, message: "Cash Withdrawn", data: withdraw.data })
        }else{
            res.status(withdraw.status).json({ type: false, message: withdraw.message })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ type: false, message: "Got Into Error While Withdrawing Cash." })
    }
}

const userControllers = {
    signUp,
    getUserById,
    getWalletById,
    getMyTransactions,
    getMyBalance,
    getNotifications,
    addCash,
    withdrawCash
}
module.exports = userControllers;