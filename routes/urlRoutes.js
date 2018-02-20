var express = require("express");
var router = express.Router();


exports.getBookmark = function(req,res){
    router.get('/users/id/bookmarks');
          res.json({ message: 'Oh, hey users' });
}
