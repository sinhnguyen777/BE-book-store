const Role = require('../models/roles.model');

class RolesController {

    // [GET]
    index(req, res){
        Role.find({})
        .then(role => res.json(role))
        .catch(error => next(error));

        // res.render('catalogs');
    }
    // [POST] 
    create(req, res, next) {
        const role = new Role(req.body);
        role.save(function(err){
            if(!err) res.send('Create Role successfully!!');
            else res.send('Create Role failed!!!');
        });
        
    }
    // [PUT]
    update(req, res, next) {
        Role.updateOne({ _id: req.params.id }, req.body)
       .then(() => res.send('Update Role successfully!!'))
       .catch(error => next(error));
        
    }
    // [DELETE] 
    delete(req, res, next) {
        Role.deleteOne({ _id: req.params.id })
        .then(() => res.send('Delete Role successfully!!'))
        .catch(error => next(error));
         
     }


}

module.exports = new RolesController;