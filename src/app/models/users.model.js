const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema ({
    fullName:{type: String},
    email:{type:String,required: true},
    phone:{type:Number},
    password:{type:String, required: true},
    address:{type:String},
    avatar:{type:String},
    blockMail:{type:Boolean, default: false},
    productLove: [
        {
            idProduct:{type: mongoose.Schema.Types.ObjectId, ref:'Product'}            
        }
    ],
    listDiscount:  [
        {
            idDiscount:{type: mongoose.Schema.Types.ObjectId, ref:'DiscountCode'}            
        }
    ],
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', User);

