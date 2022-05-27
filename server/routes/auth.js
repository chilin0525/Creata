const { Router } = require('express');
const router = Router();
const passport = require('passport')
const dotenv = require('dotenv');
const User = require('../models/user')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config()

console.log(process.env.GOOGLE_CLIENT_ID)

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    }, function(accessToken, refreshToken, profile, done) {
        // Get user profile info 
        console.log("Succeed to google")
        console.log(profile)
        User.findOne({ID: profile.id}).then((IsUserExist)=>{
            // check user exist in DB or not
            if(IsUserExist){
                console.log("User already exist.")
                done(null, IsUserExist)
            }else{
                console.log("Creating new user.")
                new User({
                    name: profile.displayName,
                    ID: profile.id,
                    image: profile.photos[0].value,
                    email: profile.emails[0].value
                })
                    .save()
                    .then((NewUser)=>{
                        console.log("New User Created.")
                        done(null, NewUser)
                    })
            }
        });
    }
));

// setup session
passport.serializeUser(function(user, cb) {
    console.log(user)
    cb(null, user._id);
});
  
passport.deserializeUser(function(id, cb) {
    console.log("Deserialize")
    User.findById(id).then((user) => {
        console.log("found user")
        cb(null, user);
    })
});

// router.get('/login', function(req, res, next) {
//     console.log("this is /auth/login")
//     res.render('login');
//   });

router.get('/fail', (req, res)=>{
    res.send("Fail of Google auth")
})

router.get('/google',passport.authenticate('google', { 
    scope: ['profile', 'email']
}));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/fail' }),
    function(req, res) {
        // Successful authentication, redirect to user profile
        res.redirect('/profile');
    }
);

module.exports = router;
  
