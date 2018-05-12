const sendMail = require('./sendMail')
const Verify = require('./auth/verify')

var sendMsg = function (User, msg) {
    let mail = msg 
    
    sendMail.SendAnEmail(mail.email, mail.subject, mail.content)
}

exports.forgotPass = function(User) {
    let payload = {
        id: User.id
    }
    let token = Verify.getShortToken(payload)
    let msg = {
        email: User.email,
        subject: "Testing forgot password",
        content: `go to this linke to verify your email\n
            /user/forgotPassword/?token=${token}\n
        this link will expire after 6 hours.`
    }

    sendMsg(User, msg)
}

exports.verifyMail = function (User) {
    let payload = {
        id: User.id
    }
    let token = Verify.getShortToken(payload)
    let msg = {
        email: User.email,
        subject: "Testing verify email",
        content: `go to this linke to verify your email\n
            /user/verify/?token=${token}\n
        this link will expire after 6 hours.`
    }

    sendMsg(User, msg)
}

exports.newPassword = function (User, newPass) {
    let msg = {
        email: User.email,
        subject: "Forgot Password",
        content: `Your new password is \'${newPass}\' please change your password after login`
    }

    sendMsg(User, msg)
}
