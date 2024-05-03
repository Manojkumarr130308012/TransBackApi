const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    
    },
    shortSortOrder : {
        type :String,
        required: false,
    },
    size : {
        type :String,
        required: false,
    },
    price : {
        type :String,
        required: false,
    },
    unit : {
        type :String,
        required: false,
    },
    tamil_item : {
        type :String,
        required: false,
    }
},{timestamps:true});

module.exports = new mongoose.model('item', ItemSchema);
