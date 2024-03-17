const otpModel = require("./models/otp")
const User = require("./models/user")
const Wallet = require("./models/wallet")
const Match = require("./models/match")
const models = {
    otpModel,
    User,
    Wallet,
    Match
}
module.exports = models;