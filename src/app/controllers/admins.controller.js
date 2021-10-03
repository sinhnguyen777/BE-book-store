const Admin = require('../models/admins.model');

class AdminsController {

    // [GET]
    index(req, res){
        Admin.find({})
        .then(admin => res.json(admin))
        .catch(error => next(error));

        // res.render('catalogs');
    }
    // [POST] 
    create(req, res, next) {
        const admin = new Admin(req.body);
        admin.save(function(err){
            if(!err) res.send('Create Admin successfully!!');
            else res.send('Create Admin failed!!!');
        });
        
    }
    // [PUT]
    update(req, res, next) {
        Admin.updateOne({ _id: req.params.id }, req.body)
       .then(() => res.send('Update Admin successfully!!'))
       .catch(error => next(error));
        
    }
    // [DELETE] 
    delete(req, res, next) {
        Admin.deleteOne({ _id: req.params.id })
        .then(() => res.send('Delete Admin successfully!!'))
        .catch(error => next(error));
         
     }


}

module.exports = new AdminsController;