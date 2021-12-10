const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comment = new Schema ({
    content : {type: String, required: true},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    idProduct:{type: mongoose.Schema.Types.ObjectId, ref:'Product'},
}, {timestamps: true});

module.exports = mongoose.model('Comment',Comment);