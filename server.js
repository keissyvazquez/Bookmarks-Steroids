var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Welcome01*',
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
var userRoutes = require('./routes/userroutes');
var register = require('./routes/register');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();
// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login);

// Work goes here

	//user routes 
router.get('/users', function(req, res){ 
	connection.query('select * from users', function (error, results, fields){ 
		if (error) throw error; 
		res.end(JSON.stringify(results));
	})
});


//user id 
router.get('/users/:id', function(req, res){ 
	connection.query('select * from users where id=?', [req.params.id], function (error, results, fields){ 
		if (error) throw error; 
		res.send(JSON.stringify(results));
	})

});

// add new user
router.post('/users', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO users SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});


// // to update user
router.put('/users/:id', function (req, res) {
	console.log("Putting new user data");
	console.log(req.params);
	console.log(req.body);
   connection.query('UPDATE `users` SET `first_name`=?,`last_name`=?,`email`=?,`password`=? where `id`=?', [req.body.first_name,req.body.last_name, req.body.email, req.body.password, req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});



// router.delete('/users/:id', userRoutes.deleteUserID);
router.delete('/users/:id', function (req, res) {
   console.log(req.params);
   connection.query('DELETE FROM `users` WHERE `id`=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end('User has been deleted!');
 });
});

// 	//url routes 
// router.get('/users/:id/bookmarks', userRoutes.getAllBookmarks);

router.get('/urls', function(req, res){ 
	connection.query('select * from urls', function (error, results, fields){ 
		if (error) throw error; 
		res.end(JSON.stringify(results));
	})
});
// router.get('/users/:id/bookmarks/:bookmarks', userRoutes.getOneBookmark);

router.get('/urls/:url_id', function(req, res){ 
	connection.query('select * from urls where url_id=?', [req.params.url_id], function (error, results, fields){ 
		if (error) throw error; 
		res.send(JSON.stringify(results));
	})

});

// // add new bookmark
// router.post('/users/bookmarks', userRoutes.postBookmark);
router.post('/urls', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO urls SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});


// // to update bookmark
// router.put('/users/:id/bookmarks/:bookmarks', userRoutes.putBookmarks);
router.put('/urls/:url_id', function (req, res) {
	console.log("Putting new urls data");
	console.log(req.params);
	console.log(req.body);
   connection.query('UPDATE `urls` SET `url`=?,`description`=?,`category`=?,`tags`=? where `id`=?', [req.body.url,req.body.description, req.body.category, req.body.tags, req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});



// //delete a bookmark
// router.delete('/users/:id/bookmarks/:bookmarks', userRoutes.deleteBookmark);
router.delete('/urls/:url_id', function (req, res) {
   console.log(req.params);
   connection.query('DELETE FROM `urls` WHERE `url_id`=?', [req.params.url_id], function (error, results, fields) {
   if (error) throw error;
   res.end('Url has been deleted!');
 });
});


// End Work

app.use('/api', router);
app.listen(5000);