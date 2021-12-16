const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema ({
    fullName:{type: String},
    email:{type:String,required: true},
    phone:{type:Number},
    password:{type:String, required: true},
    avatar:{type:String, default:'uploads/img_avatar.png'},
    vip:{type:Date},
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', User);

