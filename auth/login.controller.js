const models  = require('../models');
const User = models.User
const passport = require("passport");
const Verify = require("./verify");

exports.post = function(req, res, next) {
    passport.authenticate('local-signin', function(err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({
            err: info
          });
        }
        req.logIn(user, function(err) {
          if (err) {
            return res.status(500).json({
              err: 'Could not log in user'
            });
          }

          User.findById(user.id)
          .then( theUser => {
            if (theUser.verified) {
              var token = Verify.getToken(user);
              return res.status(200).json({
                status: true,
                message: 'Login successful!',
                token: token
              });
            } else {
              return res.status(401).json({
                status: false,
                message: 'Verify your email'
            })
          }
          })
          
          
        });
      })(req,res,next);
}
