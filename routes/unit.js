var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const Unit = require('../models/unit');

mongoose.connect('mongodb://localhost:27017/tobiapp');
var db = mongoose.connection;

router.get('/all', function (req, res, next) {
  Unit.find({}, function (err, units) {
    if (err) {
      console.log(err)
    } else {
      res.render('unit', {
        title: 'All Unit',
        unit_no: units
      })
    }    
  })
})

router.get('/', function (req, res, next) {
  Unit.find()
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

// POST 
router.post('/', function (req, res, next) {
  const unit = new Unit({
    _id: new mongoose.Types.ObjectId(),
    code_unit: req.body.code_unit,
    type_unit: req.body.type_unit,
    block_unit: req.body.block_unit,
    no_unit: req.body.no_unit,
    lt_unit: req.body.lt_unit,
    lb_unit: req.body.lb_unit,
    status_unit: req.body.status_unit,
    view_unit: req.body.view_unit,
    va_unit: req.body.va_unit,
    price_unit: {
      kpr_price: req.body.kpr_price,
      cash_price: req.body.cash_price,
      bertahap_price: req.body.bertahap_price
    },
    customer_unit: {
      name_customer: req.body.name_customer,
      address_customer: req.body.address_customer,
      ktp_customer: req.body.ktp_customer
    },
    marketing_unit: {
      name_marketing: req.body.name_marketing
    }
  });
  unit
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Handling POST request to /unit',
        createdUnit: {
          code_unit: result.code_unit,
          type_unit: result.type_unit,
          block_unit: result.block_unit,
          no_unit: result.no_unit,
          lt_unit: result.lt_unit,
          lb_unit: result.lb_unit,
          status_unit: result.status_unit,
          view_unit: result.view_unit,
          va_unit: result.va_unit,
          price_unit: {
            kpr_price: result.kpr_price,
            cash_price: result.cash_price,
            bertahap_price: result.bertahap_price,
          },
          customer_unit: {
            name_customer: result.name_customer,
            address_customer: result.address_customer,
            ktp_customer: result.ktp_customer,
          },
          marketing_unit: {
            name_marketing: result.name_marketing
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// GET BY ID
router.get('/:unitId', function (req, res, next) {
  const id = req.params.unitId;
  Unit.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'No unit data'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// UPDATE
router.patch('/:unitId', function (req, res, next) {
  const id = req.params.unitId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Unit.update(
    {
      _id: id
    },
    {
      $set: updateOps
    }
  )
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// DELETE 
router.delete('/:unitId', function (req, res, next) {
  const id = req.params.unitId;
  Unit.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    });
})

module.exports = router;
