const mongoose = require('mongoose');

const SenderlocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    
    },
    address: {
        type: String,
        required: false,
    
    },
    street: {
        type: String,
        required: false,
        unique:true
    },
    city: {
        type: String,
        required: false,
    },
    town : {
        type :String,
        required: false,
    },
    shortcutTown : {
        type :String,
        required: false,
    },
    tamil_name: {
        type: String,
        required: false,
    
    },
    tamil_address: {
        type: String,
        required: false,
    
    },
    tamil_street: {
        type: String,
        required: false,
        unique:true
    },
    tamil_city: {
        type: String,
        required: false,
    },
    tamil_town : {
        type :String,
        required: false,
    }
},{timestamps:true});

module.exports = new mongoose.model('sender_location', SenderlocationSchema);
