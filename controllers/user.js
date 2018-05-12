const jwt = require("jsonwebtoken")
const models = require("../models")
const User = models.User
const sendMail = require('../testSendMail')
const tokenDecoded = require('./tokenDecoded')
const passwdEncrypt = require('../config/passport/encrypt')
const crypto = require('crypto')

function randomStr() {
    let randStr = crypto.randomBytes(4).toString('hex')
    return randStr
}

function updateUserPass(User) {
}


exports.checkToken = (req, res) => {
    var token = req.query.token;
    var payload = jwt.decode(token);
    console.log('oh man ')
    console.log(payload)
    var exp = payload.exp;
    var expDate = new Date(exp * 1000);
    var currentDate = new Date();
    expDate.setDate(expDate.getDate() - 1)
    if (expDate < currentDate)
        res.send({ success: false })
    else
        res.send({ success: true })
}


exports.getUserInfo =(req,res)=>{

    console.log("IN NORMAL GET USER INFO")
    var token = req.query.token; 
    var payload = jwt.decode(token);
    var userId = payload.id ; 

    User.findById(userId)
    .then( user => {
        return res.status(200)
       .json({
           success: true,
           userInfo: user
       });
   
   })
   .catch(error => {
       return res.status(500)
       .json({
           success: false,
           message: "This User does not exist."
       })
   })

}

exports.forgotPassword = (req, res) => {
    let email = req.body.email
    User.findOne({
        where: {
            'email': email
        }
    })
    .then(user => {
        if (!user) {
            return res.status(403)
                .json({
                    success: false,
                    message: "email does not exist"
                })
        }
        sendMail.forgotPass(user)
        return res.status(200)
        .json({
            success: true,
            message: "Check Your email"
        })
    })
}

exports.newPassword = (req, res) => {
    let newPass = randomStr()
    let hashedPass = passwdEncrypt.getHash(newPass)
    let userId = tokenDecoded(req).id
    User.findById(userId)
    .then(user => {
        user.update({'password': hashedPass})
        .then(success => {
            if (!success) {
                return res.status(500)
                .json({
                    "success": false,
                    "message": "Error while updating the password"
                })
            }
            sendMail.newPassword(user, newPass)
            return res.status(200)
            .json({
                "success": true,
                "message": "Your password successfuly changed. check your email to see the new password"
            })
        })
    })
}

exports.reVerifyMail = (req, res) => {
    let email = req.body.email
    User.findOne({
        where: {"email": email}
    })
    .then(user => {
        if (!user) {
            return res.status(403)
                .json({
                    success: false,
                    message: "This email does not exist"
                })
        } else {
            sendMail.verifyMail(user) 
            return res.status(200)
            .json({
                success:true,
                message: "Check your email"
            })
        }
    })
}

exports.updateUserInfo = (req, res) => {
}

exports.removeUser = (req, res) => {
    let userId = tokenDecoded(req).id
    let passwd = req.body.password

    User.findById(userId)
    .then(user => {
        let validPass = passwdEncrypt.checkHash(passwd, user.password)
        if (!validPass) {
            return res.status(403)
                .json({
                    success: false,
                    message: "Wrong password"
                })
        } else {
            user.destroy({force: true})
            .then(success => {
                return res.status(200)
                .json({
                    success: true,
                    message: "The user successfuly deleted."
                })
            })
        }
    })
}
