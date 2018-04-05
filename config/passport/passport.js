const encrypt = require('./encrypt');



module.exports = function(passport, user) {
 
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
     
        }, function(req, email, password, done) {
            User.findOne({
                where: {
                    email: email
                }
            }).then( user => {
                if (user) {
                    return done(null, false, {
                        message:'That email is already taken'
                    });
                } else {
                    let hashedPass = encrypt.getHash(password);

                    let data = {
                        // inputs must be escaped
                        email: email,
                        password: hashedPass,
                        username: req.body.username
                    }

                    User.create(data)
                    .then( (newUser, created) => {
                        if (!newUser) {
                            return done(null, false);
                        }

                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
 
        }
     
    ));

    //serialize
    passport.serializeUser(function(user, done) {
    
        done(null, user.id);
    
    });

    // deserialize user 
    passport.deserializeUser(function(id, done) {
    
        User.findById(id).then( (user) => {
    
            if (user) {
                done(null, user.get() );
            } else {
                done(user.errors, null);
            }
    
        });
    
    });


//LOCAL SIGNIN
passport.use('local-signin', new LocalStrategy({
        /* by default, local strategy uses username and password,
         * we will override with email
         */
        usernameField: 'email',
        passwordField: 'password',

        // allows us to pass back the entire request to the callback
        passReqToCallback: true

    }, function(req, email, password, done) {
        var User = user;

        User.findOne({
            where: {
                email: email
            }
        }).then( user => {
 
            if (!user) {
 
                return done(null, false, {
                    message: 'Email does not exist'
                });
 
            }
            

            var isValidPassword = encrypt.checkHash(password, user.password);
            if (!isValidPassword) {
 
                return done(null, false, {
                    message: 'Incorrect password.'
                });
 
            }
 
 
            var userinfo = user.get('user');
            // console.log("\n\n the user: ")
            // console.log(JSON.stringify(user))
            // var userinfo = {
            //     "id": user.id,
            //     "username": user.username,
            //     "email": user.email
            // };
            //console.log("\n\n userinfo: "+ JSON.stringify(userinfo[1]) + "\n\n");
            return done(null, user);
 
 
        }).catch(function(err) {
 
            console.log("Error:", err);
 
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
 
        });
 
 
    })
)
}