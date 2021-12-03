const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Vip = new Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    time: { type: Number, required: true }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Vip', Vip)