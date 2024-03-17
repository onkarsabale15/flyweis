const express = require("express")
const router = express.Router();
const controllers = require("../../controller/index")
const middlewares = require("../../middleware/index")
router.post('/api/signUp', controllers.userControllers.signUp);
router.get('/api/user/:userId', controllers.userControllers.getUserById);
router.get('/api/wallet/:walletId', middlewares.authenticateUser, controllers.userControllers.getWalletById);
router.get('/api/myTransactions', middlewares.authenticateUser, controllers.userControllers.getMyTransactions);
router.get('/api/myBalance', middlewares.authenticateUser,controllers.userControllers.getMyBalance);
router.get('/api/notifications', middlewares.authenticateUser, controllers.userControllers.getNotifications);
router.post('/api/user/addCash', middlewares.authenticateUser, controllers.userControllers.addCash);
module.exports = router;