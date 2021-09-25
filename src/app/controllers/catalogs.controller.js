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
        const catalog = new Catalog(req.body);
        catalog.save();
        res.send('Save');
        
    }
    // [PUT]
    update(req, res, next) {
       Catalog.updateOne({ _id: req.params.id }, req.body)
       .then(() => res.send('Update'))
       .catch(error => next(error));
        
    }
    // [DELETE]
    delete(req, res, next) {
        Catalog.deleteOne({ _id: req.params.id })
        .then(() => res.send('Delete'))
        .catch(error => next(error));
         
     }



}

module.exports = new CatalogsController;