const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;;
const ENV = require('../.env');
const User = require("./models/user");



//passport strategies
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username/password.' });
      }

      user.comparePassword(password, function(err, isMatch) {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false); }

        return done(null, user);
      });

      return done(null, user);
    });
  }
));
