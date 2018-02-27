var Users = require('../data-models').Users;

exports.register = function(req,res){

  var today = new Date();
  Users.create({
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "email":req.body.email,
    "password":req.body.password,
    "created":today,
    "modified":today
  }).then(function(user) {
      res.status(201).json({  "message":"user registered sucessfully" });
  }).catch(function(error) {
      console.log("error ocurred",error);
      res.status(400).json({ "message":"error ocurred" });
  });
}

exports.login = function(req,res){
  var email= req.body.email;
  var password = req.body.password;
  console.log("Logging in with " + email + " and " + password);

  if (email === undefined || password === undefined) {
    res.status(409).json({"message":"Email and Password are required"});
    res.end();
  }

  Users.findOne({ where: {email: email, password: password}})
      .then(function (user) {
        console.log(user);
        if (!user) { 
          res.status(409).json({"message":"Email or Password incorrect"}); 
        } else {
          res.status(200).json({"message":"Email and Password match"});
        }
      })
      .catch(function(error) {
        console.log("error ocurred",error);
        res.status(500).json({"message":"something is broken"});
      });
}
