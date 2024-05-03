const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    
    },
    shortcutTown : {
        type :String,
        required: false,
    }
},{timestamps:true});

module.exports = new mongoose.model('location', LocationSchema);
