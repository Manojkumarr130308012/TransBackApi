const user = require("../model/user");
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const generateOtp = require('../utils/otp_generator');
const router = require('express').Router();
const userController = require('../controller/user');


router.post('/register', async (req, res) => {
    res.send(await userController.register(req.body));
});

router.post('/login', async (req, res) => {
    let userLogin = await userController.login(req.body);
    if(userLogin.message == 'Wrong Password'){
        res.status(400).json({ status: false, message: "Wrong Password" });
    }else{
        res.send(userLogin);
    }  
});

module.exports = router;