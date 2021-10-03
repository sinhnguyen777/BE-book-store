const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Role = new Schema ({
    listPrmissions:[
        {
            idPrmissions: {type: mongoose.Schema.Types.ObjectId, ref: "Prmission"}
        }
    ],
    name: {type: String}
}, {
    timestamps: true,
});

module.exports = mongoose.model('Role', Role);

