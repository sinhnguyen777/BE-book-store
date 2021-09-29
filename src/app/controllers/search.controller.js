const Product = require('../models/products.model');

class SearchController {

    getItem(req, res, next) {
        const searchField = req.query.name
        Product.find({name: {$regex: searchField}})
    }
}

module.exports = new SearchController