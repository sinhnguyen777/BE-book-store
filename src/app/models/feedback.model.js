const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Feedback = new Schema ({
    idOrder:{type: mongoose.Schema.Types.ObjectId, ref:'Order'},
    idUser:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    content:{type:String, required: true},
    rating:{type:Number, required: true},
    date:{type:Date},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Feedback', Feedback);

