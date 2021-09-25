const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Catalog = new Schema ({
    nameCata : {type: String},
},{timestamps: true});

module.exports = mongoose.model('catalog', Catalog);

