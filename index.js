// Load env variables

require('dotenv').config();

//Requires
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const express = require('express');
const methodOverride = require('method-override');
const passport = require('./config/passportConfig');
const pug = require('pug');
const request = require('request');
const session = require('express-session');

const app = express();

// Middlewares

app.set('view engine', 'pug');
app.use('/', express.static('static'));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Custom middleware - write data to locals

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.user = req.user;
  next();
});

// Serve static files

app.use(express.static('static'));

//Declare reference to models folder
var db = require('./models');

// Declare Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Successful logout! Bye!');
  res.redirect('/');
});

// Include controllers we need

app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));

app.listen(3000);
