const express = require("express");
const router = express.Router();
const controllers = require("../../controller/index")
router.get('/api/allMatches', controllers.matchControllers.getAllMatches);


module.exports = router;