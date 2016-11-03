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
  db.idea.findById(req.params.id, {
    include: [db.follow,db.user,db.commentIdea]
  }).then(function(data){
    console.log("ideaaa dataaa>>>>>>>", data)
    res.render('idea/read', {data:data})
  })
})

router.post('/comment/:id', isLoggedIn, function(req, res) {
  db.idea.findById(req.params.id).then(function(data) {
    data.createCommentIdea({
      userId: req.user.id,
      comment: req.body.comment
    }).then(function(data) {
      // res.redirect('/idea/' + data.ideaId)
      res.json({data:data})
    })
  })
});



module.exports = router;
