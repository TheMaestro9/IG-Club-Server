const Verify = require("../auth/verify");
const express = require("express");
const verifyEmail = require('../controllers/verifyUserEmail')
const userController = require("../controllers/user")
const router = express.Router();

let validateSchema = require('../json-schemaes/validateSchema')
let emailSchema = require("../json-schemaes/emailSchema")
let passwordSchema = require("../json-schemaes/passwordSchema")

//router.post('/forgotPassword',validateSchema(emailSchema), userController.forgotPass)
router.post('/verify', validateSchema(emailSchema), userController.reVerifyMail)

router.use('/', Verify.verifyUser)

router.get('/', userController.getUserInfo);
// alice for '/' path
router.get('/user-info', userController.getUserInfo);
//router.put('/',validateSchema(passwordSchema), userController.updateUserInfo)
router.delete('/',validateSchema(passwordSchema), userController.removeUser)

router.get('/verify', verifyEmail)
//router.get('/forgotPassword', userController.newPassword)

module.exports = router;
