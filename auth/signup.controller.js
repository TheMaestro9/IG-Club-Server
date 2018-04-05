var models  = require('../models');
const passport = require("passport");


// function UndefTest(arr) {
//     return arr.filter( elm => (typeof elm) === "undefined");
// }

exports.post = function(req, res, next) {

    passport.authenticate('local-signup', function(err, user, info) {
        if (err) {
            return next(err);
          }
          if (!user) {
            return res.status(401).json({
              err: info
            });
          }
        
        return res.status(200).json({
            status: 'Registration Successful!'
        });
    })(req, res, next);
//         //console.log("\nThe reuest body");
//         //console.log(req.body);
    
//     var user = [req.body.username, req.body.password, req.body.email];
//     //console.log(user);
    
//     //var user_len = UndefTest(user)
//     //console.log("user len: " + user_len + " user_len type " + typeof user_len);
//     //if (user_len < 3) {
//     //    let err = new Error();
//     //    err.status = 400;
//     //    err.message = "missing input.";
//     //    next(err);
//     //} else {
//         models.User.create({
//         username: user[0],
//         password: user[1],
//         email: user[2]
//     })
//     .then( () => {
//         //res.redirect('/');
//         res.status(201);
//         res.json({'message': "success"});
//     })
//     .catch( (error) => {
//         let err = new Error();
//         err.status = 500;
//         err.message = error;
//         next(err);
//     });
// //    }
    
}
