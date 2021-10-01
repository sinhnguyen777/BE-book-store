const Feedback = require('../models/feedback.model');

class FeedbackController {

    // [GET]
    index(req, res){
        Feedback.find({})
        .then(feedback => res.json(feedback))
        .catch(error => next(error));

        // res.render('catalogs');
    }
    // [POST] 
    create(req, res, next) {
        const feedback = new Feedback(req.body);
        feedback.save(function(err){
            if(!err) res.send('Create Feedback successfully!!');
            else res.send('Create Feedback failed!!!');
        });
       
        
    }
    // [PUT]
    update(req, res, next) {
        Feedback.updateOne({ _id: req.params.id }, req.body)
       .then(() => res.send('Update Feedback successfully!!'))
       .catch(error => next(error));
        
    }
    // [DELETE] 
    delete(req, res, next) {
        Feedback.deleteOne({ _id: req.params.id })
        .then(() => res.send('Delete Feedback successfully!!'))
        .catch(error => next(error));
         
     }


}

module.exports = new FeedbackController;