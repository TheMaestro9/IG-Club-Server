const encrypt = require('./encrypt');
const models = require("../../models");
const Child = models.Child
const verifyEmail = require('../../testSendMail')

function userCreated(user, done) {
    // send an email to the user to verify his/her email
    // verifyEmail.verifyMail(user)
    return done(null, user)
}

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
                        username: req.body.username,
                        mobile: Number(req.body.mobile),
                        grade: req.body.grade || null,
                        school: req.body.school
                    }

                    User.create(data)
                    .then( (newUser, created) => {
                        if (!newUser) {
                            return done(null, false);
                        }

                        if (newUser) {
                            let children = req.body.children;
                            let grade = data.grade
                            
                            if (children) {

                                function incertChildren(children, UserId) {
                                    /*
                                    * To understand how this function works see:
                                    * https://stackoverflow.com/questions/24660096/correct-way-to-write-loops-for-promise#24985483
                                    **/
                                    return children.reduce(function(promise, child) {
                                        return promise.then(function() {
                                            child.UserId = UserId;
                                        child.age = Number(child.age);
                                        return Child.create(child)
                                        .catch( _ => {
                                            newUser.destroy({force: true})
                                            .then( _ => {
                                            return done(null, false, {message: "Error while creating a child"})
                                            })
                                    }) 
                                        });
                                    }, Promise.resolve());
                                }

                                incertChildren(children, newUser.id, done)
                                .then( userCreated(newUser, done) )
                            } else {
                                userCreated(newUser, done)
                            }
                        }
                    }).catch( error => {
                        console.log(error)
                        done(null, false, {message: error})
                    })
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
 
 
            var userinfo = {
                "id": user.id,
                "role": Boolean(user.admin)
            };
            return done(null, userinfo);
 
 
        }).catch(function(err) {
  
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
 
        });
 
 
    })
)
}
