class ProductsController {

    // [GET] /products
    index(req, res){
        res.render('products');
    }

    // [GET] /products:slug
    show(req, res) {
        res.send('Products Detail');
    }


}

module.exports = new ProductsController;