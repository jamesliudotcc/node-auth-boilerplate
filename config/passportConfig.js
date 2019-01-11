const passport = require('passport');
const LocalStrategy = require('passport-local');

const db = require('../models');

// Provide serialie/deserialze

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});
passport.deserializeUser((id, callback) => {
  db.user
    .findByPk(id)
    .then(user => {
      callback(null, user);
    })
    .catch(err => {
      callback(err, null);
    });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (username, password, callback) => {
      db.user
        .findOne({
          where: { username: username },
        })
        .then(foundUser => {
          // if I didn't find a valid user, and that user's password hash doesn't matches a hash
          if (!foundUser || !foundUser.validPassword(password)) {
            // bad
            console.log('bad credentials');
            callback(null, null);
          } else {
            // good
            console.log('good user');
            callback(null, foundUser);
          }
        })
        .catch(callback);
    }
  )
);
module.exports = passport;
