const jwt = require('jsonwebtoken')
const models = require("../models");
const User = models.User


module.exports = function (req, res) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var decoded = jwt.decode(token)
    var userId = decoded.id

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