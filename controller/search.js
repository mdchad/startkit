var express = require('express');
var db = require('../models');
var passport = require('../config/passport');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();

router.get('/search',  isLoggedIn, function(req, res){

  res.render('/search/search')
})

router.post('/search',  isLoggedIn, function(req, res){

  res.render('/search/search')
})


module.exports = router;
