const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    
    },
    licence_number : {
        type :String,
        required: false,
    },
    batch_number : {
        type :String,
        required: false,
    },
    lorry_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
},{timestamps:true});

module.exports = new mongoose.model('driver', DriverSchema);
