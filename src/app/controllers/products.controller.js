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
        // newProduct = {
        //     nameProduct = req.body.nameProduct,
        //     price = req.body.price,
        //     img = req.body.img,
        //     images = [
        //         {

        //         }
        //     ]
        // }
        const product = new Product(req.body);
        product.save()
        res.send('create Product successfully');

    }

}
module.exports = new ProductsController;