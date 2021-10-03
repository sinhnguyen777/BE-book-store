const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    nameProduct: {type:String,required:true},
    idCatalog:{type: mongoose.Schema.Types.ObjectId, ref:'Catalog'},
    price:{type:Number,required:true},
    images:[
        {
            image:{type:String},
            positon:{type:String}
        }
    ],
    description:{type:String,required:true},
    author:{type:String,required:true},
    nxb:{type:String,required:true},
    productHot:{type:Boolean,default:false},
    productSale:{type:Boolean,default:false},
    percentSale:{type:Number},
    count:{type:Number}
},{timestamps: true})

module.exports = mongoose.model('Product', Product);
