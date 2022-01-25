const passport = require("passport");
require("dotenv").config();

/**
 * Passport Configuration  - Set up the Google Strategy with credentials
 */

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

/**
 * Utility to handle session
*/
 passport.serializeUser(function (user, done) {
   done(null, user);
 });

 passport.deserializeUser(function (user, done) {
  done(null, user);
});