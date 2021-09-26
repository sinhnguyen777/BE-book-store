const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DiscountCode = new Schema ({
    idUser:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    discount:{type:String, required: true},
    percentDiscount:{type:Number,required:true},
    dateStart:{type:Date, required: true},
    dateEnd:{type:Date, required: true}
}, {
    timestamps: true,
});

module.exports = mongoose.model('DiscountCode', DiscountCode);

