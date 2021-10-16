const User = require('../../models/user.model');

class UsersController {

    // [GET]
    index(req, res){
        User.find({})
        .then(user => res.json(user))
        .catch(error => next(error));

        // res.render('catalogs');
    }
    // [POST] 
    create(req, res, next) {
        const user = new User(req.body);
        user.save(function(err){
            if(!err) res.send('Create User successfully!!');
            else res.send('Create User failed!!!');
        });
        
    }
    // [PUT]
    update(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
       .then(() => res.send('Update User successfully!!'))
       .catch(error => next(error));
        
    }
    // [DELETE] 
    delete(req, res, next) {
        User.deleteOne({ _id: req.params.id })
        .then(() => res.send('Delete User successfully!!'))
        .catch(error => next(error));
         
     }


}

module.exports = new UsersController;