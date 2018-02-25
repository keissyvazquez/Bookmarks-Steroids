// app/routes.js

var express = require('express');
var router = express.Router();

module.exports = function(app, passport) {


    app.get('/login', function(req, res) {
        res.render('login.html', { message: req.flash('loginMessage') }); 
    });

    app.get('/signup', function(req, res) {
        res.render('signup.html', { message: req.flash('signupMessage') });
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('add_bookmark.html', {
            user : req.user 
        });
    });

};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
