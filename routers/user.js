const Verify = require("../auth/verify");
const express = require("express");
const checkTokenController = require("../controllers/user")
const router = express.Router();
router.get('/', Verify.verifyUser, function(req, res, next) {
    return res.status(200)
    .json({
        status: "success",
        message: "You are loged in"
    });

});

router.get('/check-token', checkTokenController.checkToken);
router.get('/user-info', checkTokenController.getUserInfo);


module.exports = router;