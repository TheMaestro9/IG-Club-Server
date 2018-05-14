const Verify = require("../auth/verify");
const express = require("express");
const verifyEmail = require('../controllers/verifyUserEmail')
const userController = require("../controllers/user")
const router = express.Router();

let validateSchema = require('../json-schemaes/validateSchema')
let emailSchema = require("../json-schemaes/emailSchema")
let passwordSchema = require("../json-schemaes/passwordSchema")

//Verify the user before reset the password
router.post('/forgot_password',validateSchema(emailSchema), userController.forgotPassword)
//Resend again an email to the user
router.post('/verify', validateSchema(emailSchema), userController.reVerifyMail)

//validate the token
router.use('/', Verify.verifyUser)

router.get('/', userController.getUserInfo);
// alice for '/' path
router.get('/user-info', userController.getUserInfo);
router.put('/',validateSchema(passwordSchema), userController.updateUserInfo)
router.delete('/',validateSchema(passwordSchema), userController.removeUser)

//Remark the user as verified after he/she verify his/her email
router.get('/verify', verifyEmail)
//Set a new password for the user after he/she verified his/her email
router.get('/forgotPassword', userController.newPassword)

module.exports = router;
