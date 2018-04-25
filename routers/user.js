const Verify = require("../auth/verify");
const verifyEmail = require('../controllers/verifyUserEmail')
const express = require("express");
const checkTokenController = require("../controllers/user")
const router = express.Router();

router.use('/', Verify.verifyUser)

router.get('/', function(req, res, next) {
    return res.status(200)
    .json({
        status: "success",
        message: "You are loged in"
    });

});

router.get('/user-info', checkTokenController.getUserInfo);

router.get('/verify', verifyEmail)

module.exports = router;