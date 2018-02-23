var connection = require('../server.js')


exports.register = function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  var users={
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "email":req.body.email,
    "password":req.body.password,
    "created":today,
    "modified":today
  }
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });
}

exports.login = function(req,res){
  console.log("Logging in");
  var email= req.body.email;
  var password = req.body.password;

  if (!email || !password) {
    res.status(409).json({"message":"Email and Password are required"});
    res.end();
  }

  console.log(email + " and " + password);

  connection.query('SELECT * FROM users WHERE email = ? AND password = ?',[email, password], function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.status(500).json({"message":"something is broken"});
    } else if (results.length === 0) {
      res.status(409).json({"message":"Email or Password incorrect"});
    } else {
      res.status(200).json({"message":"Email and Password match"});
    }
  });
}
