const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema ({
    fullName:{type: String, required: true},
    email:{type:String},
    phone:{type:Number},
    password:{type:String, required: true},
    address:{type:String},
    avatar:{type:String, required: true},
    blockMail:{type:Boolean, default: false},
    // productLoveID: {type:String},
    // listDiscountID: {type:String},
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', User);

