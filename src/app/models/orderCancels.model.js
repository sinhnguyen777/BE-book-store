const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderCancel = new Schema ({
    idOrder : {type: mongoose.Schema.Types.ObjectId, ref:'Order'},
    idUser : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    dateCancel : {type: Date},
    reason: {type: String}
}, {
    timestamps: true,
});

module.exports = mongoose.model('OrderCancel', OrderCancel);

