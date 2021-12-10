const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Chapter = new Schema ({
    nameChapter : {type: String, required: true},
    idProduct:{type: mongoose.Schema.Types.ObjectId, ref:'Product'},
    content : {type: String, default: 'Đang Cập Nhật'},
    stt : {type: String, required: true}
}, {
    timestamps: true,
});

module.exports = mongoose.model('Chapter', Chapter);

