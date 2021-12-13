const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema ({
    fullName:{type: String},
    email:{type:String,required: true},
    phone:{type:Number},
    password:{type:String, required: true},
    address:{type:String},
    avatar:{type:String},
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', User);

