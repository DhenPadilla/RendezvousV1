const passport = require('passport');
const strategy = require('passport-facebook');

const FacebookStrategy  = strategy.Strategy;

const facebookOptions = {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'email', 'first_name', 'last_name'],
}

const facebookCallback = (accessToken, refreshToken, profile, done) => {
    // const users = 
}

passport.use(new FacebookStrategy({
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));