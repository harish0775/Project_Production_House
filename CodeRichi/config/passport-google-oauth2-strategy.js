// const passport = require('passport');
// const googleStrategy = require('passport-google-oauth').OAuth2strategy;
// const crypto = require('crypto');
// const User = require('../models/user');
// const Post = require('../models/post');
// //tell passport use new passport
// passport.new(new googleStrategy({
// clientID:"1008823198793-ci16c9iirr90c20slhsihbj7oo8r97ba.apps.googleusercontent.com",
// clientSerect:"_-eMiewPUqcB6joW25VAiJD1",
// callbackURL:"http://localhost:8000/users/auth/google/callback",

// },
// function(accessToken,refreshToken,profile,done){
//     //find a user
// User.findOne({ 
//     email: profile.email(0).value
// }).exec(function(err,user){
//     if(err){
//         console.log('error is google strategy-passport',err);
//         return;
//     }
//     console.log(profile);
   
//     if(user){
//          // if found set this user a req.user
//         return done(null,user);
//     }else{
//         //if not found,create the user and set it as req.user
//       User.create({
//           name:profile.displayName,
//           email : profile.email(0).value,
//           passport:crypto.randomBytes(20).toString('hex')
//       },function(err,user){
//           if(err){
//               console.log('error in creating user google-passport-Strategy',err);
//               return;
//           }
//           return done(null,user);
//       })  
//     }
// })

// }
// ));

// module.exports = passport;








const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: '529671098897-9h34cqeu682eph81b73j7jqmcpkg1n7c.apps.googleusercontent.com',
        clientSecret: 'rdyoUTosLIDVD8a0x-Tk321Y',
        callbackURL: "http://localhost:12000/users/auth/google/callback",
    },

    function(accessToken, refreshToken, profile, done){
        // find a user 
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google strategy-passport', err); return;}
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(2).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;