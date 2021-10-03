const Catalog = require('../models/catalogs.model');

class CatalogsController {

    // [GET]
    index(req, res){
        Catalog.find({})
        .then(catalogs => res.json(catalogs))
        .catch(error => next(error));
        // res.render('catalogs');
    }
    // [POST] 
    create(req, res, next) {
        res.json(req.body);
        const catalog = new Catalog(req.body);
        catalog.save(function(err){
            if(!err) res.send('Create Catalog successfully!!');
            else res.send('Create Catalog failed!!!');
        });
    }
    // [PUT]
    update(req, res, next) {
       Catalog.updateOne({ _id: req.params.id }, req.body)
       .then(() => res.send('Update Catalog successfully!!'))
       .catch(error => next(error));
        
    }
    // [DELETE] 
    delete(req, res, next) {
        Catalog.deleteOne({ _id: req.params.id })
        .then(() => res.send('Delete Catalog successfully!!'))
        .catch(error => next(error));
         
     }

}

module.exports = new CatalogsController;