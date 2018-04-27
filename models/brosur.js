const mongoose = require('mongoose');

//Schema DB
const brosurSchema = mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
     name: { type: String, required: true },
     brosurFile: { type: String, required: true },
}, {
     collection: 'brosur'
});

const Brosur = module.exports = mongoose.model('Brosur', brosurSchema);
