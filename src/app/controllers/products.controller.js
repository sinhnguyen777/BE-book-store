const Product = require('../models/products.model');

class ProductsController {

    // [GET] /products
    index(req, res){
        Product.find({}, function(err, product) {
            if (!err) {
                res.json(product);                
            }else{
                res.status(400).json({error:'ERROR!!'});
            }
        });
    }


    // [POST] /Product
     Create(req,res){
            const newProduct = {
                nameProduct : req.body.nameProduct,
                idCatalog:req.body.idCatalog,
                price : req.body.price,
                description : req.body.description,
                author : req.body.author,
                nxb : req.body.nxb,
                productHot : req.body.productHot,
                productSale : req.body.productSale,
                percentSale : req.body.percentSale,
                count : 0,
            }
    
            if(req.files){
            newProduct.images = []
    
               req.files.forEach((item,i)=>{
                    const obj = {
                        image: item.path,
                        positon : i+1
                    }
                    newProduct.images.push(obj);
               })
              
            }
            const product = new Product(newProduct);
            product.save(function (err) {
                if (!err) res.send('create Product successfully');
                else
                    res.send('create Product fail');
              })
            

    }
       
    // [DELETE] 
    delete(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
        .then(() => res.send('Delete'))
        .catch(error => next(error));
         
    }


    
}   


module.exports = new ProductsController;