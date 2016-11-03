var express = require('express');
var db = require('../models');
var passport = require('../config/passport');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();

router.get('/', isLoggedIn, function(req, res) {
  db.idea.findAll(
    {
      order: 'id DESC',
      include: [db.user]
    }
  ).then(function(data) {
  console.log(data)
  res.render('homepage/home', {data:data});
})
});

module.exports = router;
