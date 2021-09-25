const Catalog = require('../models/catalogs.model');

class CatalogsController {

    // [GET] /catalogs
    index(req, res){

        Catalog.find({}, function(err, catalog) {
            if (!err) {
                res.json(catalog);                
            }else{
                res.status(400).json({error:'ERROR!!'});
            }
        });

        // res.render('catalogs');
    }

    // [POST] /catalogs
    Create(req,res){
        res.json(req.body);
        const cata = new Catalog(req.body);
        cata.save()
    }


}

module.exports = new CatalogsController;