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
            price : req.body.price,
        }
        if(req.file){
            
        }
        // if(req.files){
        //    let path = ''
        //    req.files.forEach(function(files,index,arr){
        //        path = path + files.path + ','
        //    })
        //    path = path.substring(0,path.lastIndexOf(","))
        //    newProduct.img = path
        // }
        // const product = new Product(req.body);
        // product.save()
        // res.send('create Product successfully');
        res.send(newProduct);

    }

}
module.exports = new ProductsController;