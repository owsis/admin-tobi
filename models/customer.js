const mongoose = require("mongoose");

//Schema DB
const customerSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    booking_no: { type: String, required: true },
    fullname: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    ktp: { type: String, required: true },
    npwp: { type: String, required: true },
    phone: { type: String, required: true },
    reveal_code: { type: String, required: true },
    first_payment: { type: String, required: true },
    marketing_email: { type: String, required: true },
    unit: {
      type: Object,
      required: true,
      code_unit: String,
      type_unit: String
    },
    payment: {
      type: Object,
      required: true,
      type_payment: String,
      note_payment: String
    }
  },
  {
    collection: "t004s"
  }
);

const Customer = (module.exports = mongoose.model("Customer", customerSchema));
