const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Catalog = new Schema ({
    nameCata : {type: String, required: true},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Catalog', Catalog);

