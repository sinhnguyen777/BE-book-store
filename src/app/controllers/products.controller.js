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

    // [POST] 
    create(req, res, next) {
        const product = new Product(req.body);
        product.save();
        res.send('Save');
        
    }

}

module.exports = new ProductsController;