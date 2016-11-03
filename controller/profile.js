var express = require('express');
var db = require('../models');
var passport = require('../config/passport');
var isLoggedIn = require('../middleware/isLoggedIn');
var methodOverride = require('method-override');
var router = express.Router();

router.get('/:id',  isLoggedIn, function(req, res){
  db.user.findById(req.params.id).then(function(data){
    res.render('profile/profile', {data:data})
  })
})

router.get('/edit/:id',  isLoggedIn, function(req, res){
  db.user.findById(req.params.id).then(function(data){
    res.render('profile/edit', {data:data})
  })
})



router.post('/edit/:id',  isLoggedIn, function(req, res){
  db.user.update({
    fullName: req.body.fullName,
    email: req.body.email,
    job: req.body.job
  }, { where: {
          id: req.params.id
    }
  }).then(function(data){
    res.redirect('/profile/' + req.params.id)
  })
})

router.delete('/:id', isLoggedIn, function(req, res) {
   db.user.destroy({
     where: {id: req.params.id}
    }).then(function() {
      db.idea.findAll({
        

      }).then(function() {
        res.redirect('/')
    })
  })
});


module.exports = router;
