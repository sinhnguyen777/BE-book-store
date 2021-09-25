const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Catalogs = new Schema ({
    nameCata : {type: String, required: true},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Catalog', Catalogs);

