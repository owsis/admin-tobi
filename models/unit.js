const mongoose = require('mongoose');

//Schema DB
const unitSchema = mongoose.Schema({
     
     _id: mongoose.Schema.Types.ObjectId,
     code_unit: String,
     type_unit: String,
     block_unit: String,
     no_unit: String,
     lt_unit: String,
     lb_unit: String,
     status_unit: String,
     view_unit: String,
     va_unit: String,
     /**
     kpr_price: String,
     cash_price: String,
     bertahap_price: String,
     name_customer: String,
     address_customer: String,
     ktp_customer: String,
     name_marketing: String
     */
     price_unit: {
          type: Object,
          kpr_price: { type: String },
          cash_price: { type: String },
          bertahap_price: { type: String } },
     customer_unit: {
          type: Object,
          name_customer: String,
          address_customer: String,
          ktp_customer: String },
     marketing_unit: {
          type: Object,
          name_marketing: String },
          
}, {
     collection: 'unit'
});

const Unit = module.exports = mongoose.model('Unit', unitSchema);

module.exports.getUnit = function(callback, limit) {
     Unit.find(callback).limit(limit);
}