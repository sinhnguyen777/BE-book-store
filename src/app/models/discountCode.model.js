const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DiscountCode = new Schema ({
    idUser : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    code:{type:String, required: true},
    percent:{type:Number,required:true},
    dateStart:{type:Date, },
    dateEnd:{type:Date, },
    status: {type:Boolean, default:false},
}, {
    timestamps: true,
});

module.exports = mongoose.model('DiscountCode', DiscountCode);

