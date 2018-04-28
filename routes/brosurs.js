var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/brosurs/');
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({ storage: storage });

const Brosur = require('../models/brosur');

mongoose.connect('mongodb://user_1:user_1@tobi-shard-00-00-bxq3i.mongodb.net:27017,tobi-shard-00-01-bxq3i.mongodb.net:27017,tobi-shard-00-02-bxq3i.mongodb.net:27017/tobi?ssl=true&replicaSet=Tobi-shard-0&authSource=admin');
var db = mongoose.connection;

router.post('/', upload.single('brosurFile'), function (req, res, next) {
  const brosur = new Brosur({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    brosurFile: req.file.path
  });

  brosur
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Save brosur',
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete('/:userId', function (req, res, next) {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'User deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  Brosur.find()
  .select('name brosurFile _id')
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      brosurs: docs.map(doc => {
        return {
          name: doc.name,
          brosurFile: doc.brosurFile,
          _id: doc._id,
          request: {
            type: 'GET',
            url: 'http://admin-tobi.herokuapp.com/brosur/' + doc._id
          }
        }
      })
    };
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
});

module.exports = router;
