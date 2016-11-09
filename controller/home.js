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
  // console.log(data)
  res.render('homepage/home', {data:data});
})
});

router.get('/tech', isLoggedIn, function(req, res) {
    db.idea.findAll({
      where: {
        industry: "Tech",
      }
    }).then(function(data) {
      console.log("hellllllllooooooo>>>>>>>>>>>>>>>>>>>>>>", data);
      res.render('homepage/tech', {data:data})
    })
})

router.get('/iot', isLoggedIn, function(req, res) {
    db.idea.findAll({
      where: {
        industry: "Iot"
      }
    }).then(function(data) {
      res.render('homepage/iot', {data:data})
    })
})

router.get('/saas', isLoggedIn, function(req, res) {
    db.idea.findAll({
      where: {
        industry: "Saas"
      }
    }).then(function(data) {
      res.render('homepage/saas', {data:data})
    })
})

router.get('/ecommerce', isLoggedIn, function(req, res) {
    db.idea.findAll({
      where: {
        industry: "ecommerce"
      }
    }).then(function(data) {
      res.render('homepage/ecommerce', {data:data})
    })
})

module.exports = router;
