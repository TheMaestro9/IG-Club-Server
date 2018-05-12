const jwt = require('jsonwebtoken')

module.exports = function (req) {
    /*
    *This function get a token from the request object and return the payload
    * param -> request object
    * output -> object
    */
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    let decoded = jwt.decode(token)
    return decoded
}
