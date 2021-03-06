var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './brosurs/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

const upload = multer({ 
  storage: storage 
});

const Brosur = require('../models/brosur');

mongoose.connect('mongodb://localhost/tobiapp');
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
  Brosur.remove({ _id: req.params.userId })
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
            url: 'http://admin-tobi.herokuapp.com/' + doc.brosurFile
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
    });
  });
});

router.get('/download', function(req, res, next) {
  Brosur.find({}, function (err, brosurs) {
    if (err) {
      console.log(err)
    } else {
      res.render('brosur', {
        title: 'Download Brochure',
        download: brosurs
      }); 
    }
  })
});

module.exports = router;
