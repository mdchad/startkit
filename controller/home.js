var express = require('express');
var db = require('../models');
var passport = require('../config/passport');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();

router.get('/', isLoggedIn, function(req, res) {
  // db.entry.findAll(
  //   {
  //     order: 'id DESC'
  //   }
  // ).then(function(data) {
  res.render('homepage/home');
// })
});

module.exports = router;
