const db = require('../models');
const express = require('express');
const passport = require('../config/passportConfig');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/signup', (req, res) => {
  res.render('auth/signup', { previousData: null, alerts: req.flash() });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    successFlash: 'Yay, login successful!',
    failureRedirect: '/auth/login',
    failureFlash: 'Invalid Credentials',
  })
);

router.post('/signup', (req, res) => {
  if (req.body.password != req.body.password2) {
    req.flash('error', 'Passwords must match');
    res.render('auth/signup', { previousData: req.body, alerts: req.flash() });
  } else {
    console.log(req.body);
    db.user
      .findOrCreate({
        where: { username: req.body.username },
        defaults: req.body,
      })
      .spread((user, wasCreated) => {
        console.log('got to promise');
        if (wasCreated) {
          console.log('was created');
          req.flash('success', 'Yay good job, you signed up!');
          res.redirect('/profile');
        } else {
          console.log('was found');
          req.flash('error', 'Username already in use');
          res.render('auth/signup', {
            previousData: req.body,
            alerts: req.flash(),
          });
        }
      })
      .catch(err => {
        if (err && err.errors) {
          err.errors.forEach(err => {
            if (err.type == 'Validation error') {
              req.flash('error', 'Validation error:' + err.message);
              console.log('Error type:', err.type);
            } else {
              req.flash('error', 'Not-Validation error:' + err.message);
              console.log('Error, not validation', err.type);
            }
          });
        }
        console.log('Error', err);
        req.flash(
          'error',
          'A server error occured. Please contact your admin.'
        );
        res.locals.alerts = req.flash();
        res.render('auth/signup', {
          previousData: req.body,
          alerts: req.flash(),
        });
      });
  }
});

module.exports = router;
