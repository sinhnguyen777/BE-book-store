const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Admin = new Schema ({
    fullName:{type: String, required: true},
    email:{type:String},
    password:{type:String, required: true},
    idRole: {type: mongoose.Schema.Types.ObjectId, ref:'Role'}
}, {
    timestamps: true,
});

module.exports = mongoose.model('Admin', Admin);

