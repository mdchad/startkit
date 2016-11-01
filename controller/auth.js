var express = require('express');
var db = require('../models');
var passport = require('../config/passport');
var router = express.Router();


router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {
  console.log(req.body);
  var email = req.body.email;
  var fullname = req.body.fullName;
  var password = req.body.password;
  var job = req.body.job

  db.user.findOrCreate({
    where: { email: email },
    defaults: {
      fullName: fullname,
      password: password,
      job: job
    }
  }).spread(function(user, created) {
    if (created) {
      console.log("account created");
      console.log(user);
      passport.authenticate('local', {
        successRedirect: '/home',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      console.log("email already exist");
      req.flash('error', 'Email already exists');
      res.redirect('/auth/login');
    }
  }).catch(function(error) {
    console.log(error);
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}));

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/');
});



module.exports = router;
