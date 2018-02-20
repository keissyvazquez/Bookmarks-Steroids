var express = require("express");
var router = express.Router();


exports.getAll = function(req,res){
    router.get('/users');
          res.json({ message: 'Oh, hey users' });
}

exports.getUserID = function(req,res){
    router.get('/users/id');
          res.json({ message: 'Oh, hey users & ids!' });
}

exports.postAll = function(req,res){
    router.post('/users/post');
          res.json({ message: 'Oh! Hey new user!' });
}

exports.putUserID = function(req,res){
    router.put('/users/id/post');
          res.json({ message: 'Oh, putting new user/id' });
}

exports.deleteUserID = function(req,res){
    router.delete('/users/id/delete');
          res.json({ message: 'Oh, bye user/id' });
}

exports.getBookmark = function(req,res){
    router.get('/users/id/bookmarks');
          res.json({ message: 'Oh, ALL Bookmarks' });
}
