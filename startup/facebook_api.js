const passport = require('passport');
FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config/config_fb_api');

const { User } = require('../models/user');

/*config is our configuration variable.*/
passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret: config.facebook_api_secret,
    callbackURL: config.callback_url,
    profileFields: ['id', 'displayName', 'email']
},
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(async function () {
           
            //Check whether the User exists or not using profile.id
            /*if (config.use_database) {
                //Further code of Database.
            }*/
            console.log(accessToken);

            const user = await User.getUser(profile._json);
            console.log(user);
            return done(null, profile);
        });
    }
));