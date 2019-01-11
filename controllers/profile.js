var express = require('express');
var router = express.Router();

// middlewares

const loggedIn = require('../middleware/loggedIn');
const isAdmin = require('../middleware/isAdmin');

router.get('/', loggedIn, (req, res) => {
  res.render('profile');
});

router.get('/users', (req, res) => {
  //
  res.send('/profiles/users coming soon');
});

router.get('/admin', isAdmin, (req, res) => {
  //
  res.render('admin');
});

module.exports = router;
