var express    = require("express");
var Users = require('./data-models').Users;
var Urls = require('./data-models').Urls;
var login = require('./routes/loginroutes');
var register = require('./routes/register');
var bodyParser = require('body-parser');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var app = express();

var validPassword = function(user, password) {
  return user.get("password") === password;
}

passport.use(new BasicStrategy(function(username, password, done) {
    Users.findOne({ where: {email: username}})
      .then(function (user) {
        if (!user) { return done(null, false,  { message: 'Invalid email, user does not exist' }); }
        if (!validPassword(user, password)) { return done(null, false,  { message: 'Invalid password' }); }
        return done(null, user);
      })
      .catch(function(error) {
        return done(error)
      });
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();

//route to handle user registration
app.post('/register',login.register);
app.post('/login',login.login);

// API routes starts here

	//user routes
router.get('/users', function(req, res) {

  Users.findAll()
      .then(function (users) {
        res.json(users);
      })
      .catch(function(error) {
        res.status(500).json({message:"Internal server error"});
      });
});


	//user id
router.get('/users/:id', function(req, res){
  Users.findById(req.params.id)
      .then(function (user) {
        if (!user)
          res.status(404).json({message: "The item does not exist"});
        else
          res.json(user);
      })
      .catch(function(error) {
        res.status(500).json({message:"Internal server error"});
      });

});


	// to update user
router.put('/users/:id', function (req, res) {

  Users.findById(req.params.id)
      .then(function (user) {
        if (!user)
          res.status(404).json({message: "The item does not exist"});
        else {
          if (req.body.first_name)
            user.first_name = req.body.first_name;

          if (req.body.last_name)
            user.last_name = req.body.last_name;
          
          if (req.body.email)
            user.email = req.body.email;
          
          if (req.body.password)
            user.password = req.body.password;
          
          user.save().then(function() {
              res.json(user);
          })
        }
      })
      .catch(function(error) {
        res.status(500).json({message:"Internal server error"});
      });

});



	// to delete users
router.delete('/users/:id', function (req, res) {
  res.json({message: 'This is for version 2!'});
});


// to get all urls
router.get('/urls', function(req, res){

  Urls.findAll({where: {"user_id": req.user.get("id")}})
    .then(function (urls) {
      res.json(urls);
    })
    .catch(function(error) {
      res.status(500).json({message:"Internal server error"});
    });
});


	// to get urls
router.get('/urls/:url_id', function(req, res){

  Urls.findById(req.params.url_id)
      .then(function (url) {
        if (!url)
          res.status(404).json({message: "The url does not exist"});
        else
          res.json(url);
      })
      .catch(function(error) {
        res.status(500).json({message:"Internal server error"});
      });

});

// // add new urls
router.post('/urls', function (req, res) {

  Urls.create({
    "url":req.body.url,
    "title":req.body.title,
    "description":req.body.description,
    "category":req.body.category,
    "tags":req.body.tags,
    "user_id": req.user.id
  }).then(function(results) {
      res.append('Location', '/api/urls/' + results.insertId);
      res.status(201).json({message: "The url was successfully added"});
  }).catch(function(error) {
      console.log(error);
      res.status(500).json({message:"Internal server error"});
  });

});


// // to update a url
router.put('/urls/:url_id', function (req, res) {
  res.json({message: 'This is for version 2!'});
});

// //delete a url
router.delete('/urls/:url_id', function (req, res) {
  res.json({message: 'This is for version 2!'});
});

app.use('/api', passport.authenticate('basic', { session: false }), router);
// process.env.PORT is for Heroku
app.listen(process.env.PORT || 5000);
