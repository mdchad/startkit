var express = require('express');
var db = require('../models');
var passport = require('../config/passport');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();

router.get('/all',  isLoggedIn, function(req, res){
  db.inspiration.findAll({
    include:[db.user]
  }).then(function(data){
    console.log(data);
    res.render('inspiration/all', {data:data})
  })
})

router.get('/create',  isLoggedIn, function(req, res){
    res.render('inspiration/create')
})

router.post('/create', isLoggedIn, function(req, res) {
  db.inspiration.create({
    userId: req.user.id,
    problem: req.body.problem
  }).then(function() {
      res.redirect('/inspiration/all')
  })
});

module.exports = router;
