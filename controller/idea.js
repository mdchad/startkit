var express = require('express');
var db = require('../models');
var passport = require('../config/passport');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();

router.get('/create',  isLoggedIn, function(req, res){
  res.render('idea/create')
})

router.post('/create', isLoggedIn, function(req, res) {
  db.idea.create({
    userId: req.user.id,
    title: req.body.title,
    description: req.body.description,
    businessplan: req.body.businessplan,
    industry: req.body.industry,
    type: req.body.type
  }).then(function(data) {
  res.redirect('/idea/' + data.id)
})
});

router.get('/:id', isLoggedIn, function(req, res) {
  db.idea.findById(req.params.id).then(function(data){
    res.render('idea/read', {data:data})
  })
})

module.exports = router;
