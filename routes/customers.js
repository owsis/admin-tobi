var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const Customer = require('../models/customer');
const Unit = require('../models/unit');

mongoose.connect('mongodb://user_1:user_1@tobi-shard-00-00-bxq3i.mongodb.net:27017,tobi-shard-00-01-bxq3i.mongodb.net:27017,tobi-shard-00-02-bxq3i.mongodb.net:27017/tobi?ssl=true&replicaSet=Tobi-shard-0&authSource=admin');
var db = mongoose.connection;

router.post('/', function (req, res, next) {

  const customer = new Customer({
    _id: new mongoose.Types.ObjectId(),
    booking_no: req.body.booking_no,
    fullname: req.body.fullname,
    address: req.body.address,
    email: req.body.email,
    ktp: req.body.ktp,
    npwp: req.body.npwp,
    phone: req.body.phone,
    reveal_code: req.body.reveal_code,
    first_payment: req.body.first_payment,
    marketing_email: req.body.marketing_email,
    unit: {
      code_unit: req.body.code_unit,
      type_unit: req.body.type_unit
    },
    payment: {
      type_payment: req.body.type_payment,
      note_payment: req.body.note_payment
    }
  });
  
  const _update = {
    code_unit: req.body.code_unit
  };
  const _status = {
    status_unit: 'close'
  };
  Unit.update(_update, _status, function (err, raw) {
    if (err) {
      res.send(err);
    }
  })

  customer
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Save customer',
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get('/:marketing_e', function (req, res, next) {
  Customer.find({ marketing_email: req.params.marketing_e })
    .exec()
    .then(docs => {
      const response = { 
        count: docs.length, 
        customers: docs 
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  Customer.find()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        units: docs
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

module.exports = router;
