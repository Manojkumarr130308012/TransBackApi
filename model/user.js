const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
    
    },
    fullName: {
        type: String,
        required: false,
    
    },
    email: {
        type: String,
        required: false,
        unique:true
    },
    password: {
        type: String,
        required: false,
    },
    phone : {
        type :String,
        default : "0123456789"
    },
    userType:{type:String,required:true,default:"Admin",enum:['staff','Admin']},
    userFilter: {
        type: Boolean,
        required: false,
        default : false
    },
    billEdit: {
        type: Boolean,
        required: false,
        default : false
    },
    userLocation: {
        type: String,
        required: false,
    },
    godown: {
        type: String,
        required: false,
    },
    billSeries: {
        type: String,
        required: false,
    }
},{timestamps:true});

module.exports = new mongoose.model('user', userSchema);
