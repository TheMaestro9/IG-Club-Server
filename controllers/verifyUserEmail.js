const jwt = require('jsonwebtoken')

module.exports = function (req, res) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var decoded = jwt.decode(token)
    var userId = decoded.id
    
    return res.status(200).json({
        success: true,
        message: "You verified your mail."
    })
}