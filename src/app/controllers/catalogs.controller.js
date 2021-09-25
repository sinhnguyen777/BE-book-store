const Catalog = require('../models/catalogs.model');

class CatalogsController {

    // [GET] /catalogs
    index(req, res){

        Catalog.find({}, function(err, catalogs) {
            if (!err) {
                res.json(catalogs);               
            }else{
                res.status(400).json({error:'ERROR!!'});
            }
        });

        // Catalog.find({})
        // .then(catalogs => res.json(catalogs))
        // .catch(error => next(error));

        // res.render('catalogs');
    }



}

module.exports = new CatalogsController;