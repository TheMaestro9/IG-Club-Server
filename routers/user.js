const Verify = require("../auth/verify");
const express = require("express");
const router = express.Router();

router.get('/', Verify.verifyUser, function(req, res, next) {
    return res.status(200)
    .json({
        status: "success",
        message: "You are loged in"
    });

});

module.exports = router;