var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var passport = require('./config/passport');
var session = require('express-session');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var methodOverride = require('method-override');

var app = express();

app.use(express.static(__dirname + '/public/'));

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended:false}));
app.use(session({
  secret: 'papadop',
  resave: false,
  saveUninitialized: true
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

app.use(function (req, res, next) {
  if (req.query._method == 'DELETE') {
    req.method = 'DELETE';
    req.url = req.path
  }
  next()
})


app.get('/', function(req, res) {
  res.render('index');
});

app.use('/auth', require('./controller/auth'));

app.use('/home', require('./controller/home'));

app.use('/idea', require('./controller/idea'))

app.use('/search', require('./controller/search'))

app.use('/profile', require('./controller/profile'))

app.use('/follow', require('./controller/follow'))





var server = app.listen(process.env.PORT || 3000);
console.log("Server is up and running on")

module.exports = server;
