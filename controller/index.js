const authController = require("./controllers/authController")
const userControllers = require("./controllers/userController")
const matchControllers = require("./controllers/matchControllers")
const controllers = {
    authController,
    userControllers,
    matchControllers
}
module.exports = controllers;