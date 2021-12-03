const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema ({
    idUser : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    orderDetail: [
        {
            idProduct :{type: mongoose.Schema.Types.ObjectId, ref:'Product'},
            quantity : {type:Number, default: 1},
        },
    ],
    phone: {type: Number, required: true},
    address: {type: Object, required: true},
    email: {type: String, required: true},
    status: {
        type:{type: String, default: '0'},
        name:{type: String, default: 'Chưa xác nhận'}
    },
    total: {type: Number},
    dateCreate:{type:Date, required: true},
    dateSend:{type:Date}
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', Order);

