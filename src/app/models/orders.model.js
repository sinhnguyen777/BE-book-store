const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema ({
    idUser : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    phone: {type: Number},
    address: {type: String},
    email: {type: String},
    status: [
        {
            idStatus: {type: mongoose.Schema.Types.ObjectId},
            name: {type: String},
            type: {type: Boolean}
        }
    ],
    total: {type: Number},
    cancel : {type: Boolean, default: false},
    dateCreate:{type:Date, required: true},
    dateSend:{type:Date, required: true}
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', Order);

