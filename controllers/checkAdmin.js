const tokenDecoded = require('./tokenDecoded')

module.exports = function(req, res, next) {
    let admin = tokenDecoded(req).role

    if (admin) next()
    else {
        let error = new Error("permission denied")
        error.status = 401
        next(error)
    }
}