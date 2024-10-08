const express = require("express");
const { payForPoints } = require("../controllers/paymentController");

const router = express.Router();
//**********************************SignUp*******************************************************
router.post("/payForPoints", payForPoints);
//******************************************Login*********************************************

module.exports = router;
