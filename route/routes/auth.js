const express = require("express");
const router = express.Router();
const controllers = require("../../controller/index");

router.get("/api/otp/send/:mobileNumber", controllers.authController.sendOtp);
router.post("/api/otp/verify", controllers.authController.verifyOtp);
router.get("/api/otp/resend/:mobileNumber", controllers.authController.sendOtp)
module.exports = router;