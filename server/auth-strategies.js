const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
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
        if (!isMatch) {
          console.log("user.comparePassword>",isMatch);//todo
          return done(null, false,{ message: 'Incorrect username/password.' });
        }
        return done(null, user);
      });
    });
  }
));

const jwtStrategyOptions = {
  jwtFromRequest:(req)=>{return req.headers.authorization}, //ExtractJwt.fromHeader("Authorization"),
  secretOrKey: ENV.SECRET
};

passport.use(new JwtStrategy(jwtStrategyOptions, function(jwt_payload, done) {
    console.log("JwtStrategy",jwt_payload);//todo
    User.findOne({ username: jwt_payload.username }, function (err, user) {
      if (err) { return done(err); }
      if (user) {
        return done(null, user);
      }
      return done(null, false);
      });
  }));
