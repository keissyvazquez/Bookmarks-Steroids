var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bookmarks'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

module.exports = connection;

var express    = require("express");
var login = require('./routes/loginroutes');
var register = require('./routes/register');
var bodyParser = require('body-parser');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var app = express();

var validPassword = function(user, password) {
  return user.password === password;
}

passport.use(new BasicStrategy(function(username, password, done) {
    console.log("In here working");
    console.log(username + " and " + password);
    connection.query('select * from users where email=?', username, function (error, results, fields){
      if (error) { return done(error); }
      if (results.length === 0) { return done(null, false,  { message: 'Invalid email, user does not exist' }); }
      if (!validPassword(results[0], password)) { return done(null, false,  { message: 'Invalid password' }); }
      return done(null, results[0]);
    });
  }
));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();
// test route
app.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
app.post('/register',login.register);
app.post('/login',login.login);

// API routes starts here

	//user routes
router.get('/users',
            function(req, res) {
	connection.query('select * from users', function (error, results, fields){
    if (error){
      res.status(500).json({message:"Internal server error"});
    }
    else{
      res.json(results);
    }
	})
});


	//user id
router.get('/users/:id', function(req, res){
	connection.query('select * from users where id=?', [req.params.id], function (error, results, fields){
    if (error){
      res.status(500).json({message:"Internal server error"});
    }
    else if (results.length === 0){
      res.status(404).json({message: "The item does not exist"});
    }
    else{
      res.json(results[0]);
    }
	})

});

	// add new user
router.post('/users', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO users SET ?', postData, function (error, results, fields) {
     if (error){
        res.status(500).json({message:"Internal server error"});
      }
     else {
        res.append('Location', '/api/users/' + results.insertId);
        res.status(201).json({message: "The user was successfully created"});
      }
 });
});


	// to update user
router.put('/users/:id', function (req, res) {
	console.log("Putting new user data");
	console.log(req.params);
	console.log(req.body);
   connection.query('UPDATE `users` SET `first_name`=?,`last_name`=?,`email`=?,`password`=? where `id`=?', [req.body.first_name,req.body.last_name, req.body.email, req.body.password, req.params.id], function (error, results, fields) {
   if (error) {
     res.status(500).json({message:"Internal server error"});
   }
   else {
    res.status(200).json(results[0]);
    }
 });
});



	// to delete users
router.delete('/users/:id', function (req, res) {
   console.log(req.params);
   connection.query('DELETE FROM `users` WHERE `id`=?', [req.params.id], function (error, results, fields) {
   if (error) {
     res.status(500).json({message:"Internal server error"});
   }
   else{
    res.end('User has been deleted!');
    }
 });
});

	// to get all urls
  router.get('/urls', function(req, res){
  	connection.query('select * from urls', function (error, results, fields){
      if (error){
        res.status(500).json({message:"Internal server error"});
      }
      else{
        res.json(results);
       }
  	})
  });


	// to get urls
router.get('/urls/:url_id', function(req, res){
	connection.query('select * from urls where url_id=?', [req.params.url_id], function (error, results, fields){
    if (error){
      res.status(500).json({message:"Internal server error"});
    }
    else if (results.length === 0){
      res.status(404).json({message: "The does not exist"});
    }
    else{
      res.json(results[0]);
     }
	})

});

// // add new urls
router.post('/urls', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO urls SET ?', postData, function (error, results, fields) {
   if (error) {
     res.status(500).json({message:"Internal server error"});
   }
   else{
     res.append('Location', '/api/urls/' + results.insertId);
     res.status(201).json({message: "The url was successfully added"});
    }
 });
});


// // to update a url
router.put('/urls/:url_id', function (req, res) {
	console.log("Putting new urls data");
	console.log(req.params);
	console.log(req.body);
   connection.query('UPDATE `urls` SET `url`=?,`description`=?,`category`=?,`tags`=? where `id`=?', [req.body.url,req.body.description, req.body.category, req.body.tags, req.params.id], function (error, results, fields) {
   if (error) {
     res.status(500).json({message:"Internal server error"});
   }
   else{
    res.status(200).json(results[0]);
    }
 });
});



// //delete a url
router.delete('/urls/:url_id', function (req, res) {
   console.log(req.params);
   connection.query('DELETE FROM `urls` WHERE `url_id`=?', [req.params.url_id], function (error, results, fields) {
   if (error) {
     res.status(500).json({message:"Internal server error"});
   }
   else{
    res.end('Url has been deleted!');
    }
 });
});

app.use('/api', passport.authenticate('basic', { session: false }), router);
app.listen(5000);
