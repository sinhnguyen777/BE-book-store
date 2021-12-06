const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

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
    quantitySale:{type:Number},
    quantity:{type:Number},
    view:{type:Number},
    wishlist:[
        {
            idProduct:{type: mongoose.Schema.Types.ObjectId, ref:'Product'},
            idUser:{type: mongoose.Schema.Types.ObjectId, ref:'User'}
        }
    ],
    slug: { type: String, slug: 'nameProduct' ,unique:true}
},{timestamps: true})

module.exports = mongoose.model('Product', Product);
