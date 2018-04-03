exports.post = function(req, res, next) {
    res.status(201);
    res.json({'message': "Not yet implemented"});
}

exports.notPost = function(req, res, next) {
    let err = new Error()
    err.status = 401;
    err.message = "wrong method";
    
    next(err);
}