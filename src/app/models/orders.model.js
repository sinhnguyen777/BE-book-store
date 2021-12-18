const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema ({
    idUser : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    fullName: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: Object, required: true},
    email: {type: String, required: true},
    status: {type: Boolean, default: false},
    cancel:{type:Boolean, default: false},
    reason:{type:String },
    total: {type: Number},
    dateSend:{type:Date},
    dateSuccess:{type:Date},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', Order);

