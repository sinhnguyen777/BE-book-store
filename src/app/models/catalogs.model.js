const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Catalogs = new Schema ({
    nameCata : {type: String},
    createdAt : {type: Date, default: Date.now},
    updatedAt : {type: Date, default: Date.now},
});

module.exports = mongoose.model('Catalog', Catalogs);

