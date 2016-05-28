var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use('local-signup', new LocalStrategy({

            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function (req, username, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function(){

                // find a user whose username is the same as the forms username
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'username' : username}, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that username
                    if (user) {
                        return done(
                            null, false, req.flash(
                                'signupMessage', 'Пользователь с таким именем уже существует'
                            )
                        );
                    } else {

                        //if there is no user with that username
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.username = username;
                        newUser.nickName = nick;
                        newUser.passsword = newUser.generateHash(password);

                        // save the user
                        newUser.save( function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
        User.findOne({ 'username': username }, function(err, user){
           if (err)
                return done(err);
           if (!user)
                return done(null, false, req.flash('loginMessage', 'Неправильное имя пользователя!'));
           if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Неправильно введен пароль!'))
        });
    }));
};