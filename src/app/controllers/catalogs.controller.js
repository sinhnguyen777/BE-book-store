class CatalogsController {

    // [GET] /catalogs
    index(req, res){
        res.render('catalogs');
    }



}

module.exports = new CatalogsController;