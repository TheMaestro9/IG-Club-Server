const sendMail = require('./sendMail')
const Verify = require('./auth/verify')

module.exports = function (User) {
    let payload = {
        id: User.id
    }
    let token = Verify.getToken(payload)
    let mail = {
        email: User.email,
        subject: "Testing verify email",
        content: `go to this linke to verify your email\n
            /user/verify/?token=${token}`
    }
    
    sendMail.SendAnEmail(mail.email, mail.subject, mail.content)
}