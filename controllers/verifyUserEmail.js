const models = require("../models");
const User = models.User
const tokenDecoded = require('./tokenDecoded')

module.exports = function (req, res) {
    var userId = tokenDecoded(req).id

    User.findById(userId).then( user => {
        return user.update({
            verified: true
        })
        .then( _ => {
            return res.status(200).json({
                success: true,
                message: "You verified your mail."
            })
        })
        .catch( error => {
            return res.status(500).json({
                success: false,
                message: "Error while verifing your mail."
            })
        })
    })
}