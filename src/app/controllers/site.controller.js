class SiteController {

    // [GET] /home
    index(req, res){
        res.json({
            name:"test"
        });
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }


}

module.exports = new SiteController;