const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    
    },
    fullName: {
        type: String,
        required: true,
    
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    phone : {
        type :String,
        default : "0123456789",
        required: true
    },
    userType:{type:String,required:true,default:"Admin",enum:['staff','Admin']},
    userFilter: {
        type: Boolean,
        required: true,
        default : false
    },
    billEdit: {
        type: Boolean,
        required: true,
        default : false
    },
    userLocation: {
        type: String,
        required: true,
    },
    godown: {
        type: String,
        required: true,
    },
    billSeries: {
        type: String,
        required: true,
    }
},{timestamps:true});

module.exports = new mongoose.model('truckuser', userSchema);
