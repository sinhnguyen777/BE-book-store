const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderDetail = new Schema ({
    idProduct : {type: mongoose.Schema.Types.ObjectId, ref:'Product'},
    idOrder : {type: mongoose.Schema.Types.ObjectId, ref:'Order'},    
    idUser : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    quantity : {type: Number},
    price: {type: Number},
    feedback:{type: Boolean, default: false}
}, {
    timestamps: true,
});

module.exports = mongoose.model('OrderDetail', OrderDetail);

