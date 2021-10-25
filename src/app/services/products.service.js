const ProductModel = require('../models/products.model');

exports. getAll = async () => {
    try{
        const Product = await ProductModel.find({});
        return Product
    }
    catch(err){
        console.log(err)
    }
}

exports. getNameSearch = async (nameProduct) => {
    try{
        var regex = new RegExp (nameProduct,'i')
        const ProductSearch = await ProductModel.find( {nameProduct:regex } )
        return ProductSearch
    }
    catch(err){
        console.log(err)
    }
}

exports. getAuthorSearch = async (author) => {
    try{
        var regex = new RegExp (author,'i')
        const ProductSearch = await ProductModel.find( {author:regex } )
        return ProductSearch
    }
    catch(err){
        console.log(err)
    }
}

exports.getById = async (id) => {
    try{
        const Product = await ProductModel.findById(id);
        return Product    
    }
    catch(err){
        console.log(err)
    }
}

exports.getByIdCata = async (idCata) => {
    try{
        const id = await ProductModel.find({idCatalog:idCata}); 
       if(id){
           return user
       }
       return fales
    }
    catch(err){
        console.log(err)
    }
}

exports.findBySlug = async (slug) => {
    try{
        const Product = await ProductModel.find({slug: slug})
        if(Product.length==0) return []
        return Product  
    }
    catch(err){
        console.log(err)
    }
}

exports.createNew = async (values) => {
    try{
        const nameProduct = values.nameProduct
        const idCatalog = values.idCatalog
        const price = values.price
        const description = values.description
        const author = values.author
        const nxb = values.nxb
        const productHot = values.productHot
        const productSale = values.productSale
        const percentSale = values.percentSale
        const count = values.count
        const slug = values.slug
        let newProduct = new ProductModel({
            nameProduct,
            idCatalog,
            price,
            description,
            author,
            nxb,
            productHot,
            productSale,
            percentSale,
            count,
            slug
        })
        return newProduct.save((err) => {
            if(err){
                console.log(err)
                console.log('Add user fail!');
            }else{
                console.log('Add user success!');
            }
        })
    }
    catch(err){
        console.log(err)
    }

}

exports.delete = async (id)=>{
    try{
        const Product = await this.getById(id);
        if(!Product){
            return false
        }
        return await ProductModel.deleteOne({_id: id}, (err) => {
                    console.log('Delete success!');
        }).clone()
    }
    catch(err){
        console.log(err)
    }
  
}

exports.update = async (id, values) => {
      return await ProductModel.updateOne({ _id: id }, values)
       .then(() => true)
       .catch(error => false);
}
