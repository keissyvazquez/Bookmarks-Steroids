exports.getAll = function(req,res){
  res.send(req.params.users); 
  res.json({ message: 'Oh, hey users' });
}

exports.getUserID = function(req,res){
  res.send(req.params.id); 
  res.json({ message: 'Oh, hey users & ids!' });
}

exports.postAll = function(req,res){
  
  res.json({ message: 'Oh! Hey new user!' });
}

exports.putUserID = function(req,res){
  
  res.json({ message: 'Oh, putting new user/id' });
}

exports.deleteUserID = function(req,res){
  
  res.json({ message: 'Oh, bye user/id' });
}

exports.getBookmark = function(req,res){
  res.send(req.params.url); 
  res.json({ message: 'Oh, ALL Bookmarks' });
}
