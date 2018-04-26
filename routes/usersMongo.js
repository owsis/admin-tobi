var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

User = require('../models/user');

/*
mongoose.connect('mongodb://localhost/tobi');
var db = mongoose.connection;
*/

router.get('/', function(req, res) {
  User.getUsers( function(error, users) {
    if (error) {
      throw error;
    }
    res.json(users);
  });
});

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */

module.exports = router;
