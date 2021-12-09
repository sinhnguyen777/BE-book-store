const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Wishlish = new Schema({
    idProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Wishlish', Wishlish);

