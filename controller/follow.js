var express = require('express');
var db = require('../models');
var passport = require('../config/passport');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();

router.get('/', function(req, res){
  db.follow.findAll({
    include: [{
      model: db.idea}]
  }).then(function(data){
    res.json(data)
  })
})

router.post('/:id', isLoggedIn, function(req, res) {
  db.idea.findById(req.params.id).then(function(idea) {
    db.follow.findOrCreate({
      where: {
        userId: req.user.id,
        ideaId:req.params.id
      }
    }).then(function() {
      res.redirect('/idea/' + idea.id)
    })
  })
});

module.exports = router;
