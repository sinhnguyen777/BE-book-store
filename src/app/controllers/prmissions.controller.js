const Prmission = require('../models/prmissions.model');

class PrmissionsController {

    // [GET]
    index(req, res){
        Prmission.find({})
        .then(prmissions => res.json(prmissions))
        .catch(error => next(error));
        // res.render('Prmissions');
    }
    // [POST] 
    create(req, res, next) {
        const prmission = new Prmission(req.body);
        prmission.save(function(err){
            if(!err) res.send('Create Prmission successfully!!');
            else res.send('Create Prmission failed!!!');
        });
    }
    // [PUT]
    update(req, res, next) {
       Prmission.updateOne({ _id: req.params.id }, req.body)
       .then(() => res.send('Update Prmission successfully!!'))
       .catch(error => next(error));
        
    }
    // [DELETE] 
    delete(req, res, next) {
        Prmission.deleteOne({ _id: req.params.id })
        .then(() => res.send('Delete Prmission successfully!!'))
        .catch(error => next(error));
         
     }


}

module.exports = new PrmissionsController;