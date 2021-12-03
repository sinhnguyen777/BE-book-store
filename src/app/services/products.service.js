const ProductModel = require('../models/products.model');

exports. getAll = async (filter) => {
    try{
        const Product = await ProductModel.find(filter);
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
        const products = await ProductModel.find({idCatalog:idCata}); 
       if(products){
           return products;
       }
       return false
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
        const images = values.images
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
            slug,
            images
        })
        return newProduct.save((err) => {
            if(err){
                console.log(err)
                console.log('Add user fail!');
                return false
            }else{
                console.log('Add user success!');
                return true
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
    if(values.files){
        const newValue = [... value.images ]

           req.files.forEach((item,i)=>{
                const obj = {
                    image: item.path,
                    positon : i+1
                }
                console.log(newValue);
                // value.images.push(obj);
           })
          
        }
    //   return await ProductModel.updateOne({ _id: id }, values)
    //    .then(() => true)
    //    .catch(error => false);
}
