const mongoose = require('mongoose');

const LorrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    
    },
    number : {
        type :String,
        required: false,
    },
    fc_expiry_date : {
        type :String,
        required: false,
    },
    insurance_expiry_date : {
        type :String,
        required: false,
    }
},{timestamps:true});

module.exports = new mongoose.model('lorry', LorrySchema);
