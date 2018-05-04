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
                success: true,
                message: 'Login successful!',
                token: token,
                admin:theUser.admin
              });
            } else {
              return res.status(401).json({
                sucess: false,
                message: 'Verify your email'
            })
          }
          })
          
          
        });
      })(req,res,next);
}
