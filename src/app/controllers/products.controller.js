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
        // res.json(req.body);
        const product = new Product(req.body);
        product.save()
    }

}

module.exports = new ProductsController;