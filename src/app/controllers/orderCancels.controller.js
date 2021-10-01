const OrderCancel = require('../models/orderCancels.model');

class OrderCancelsController {

    // [GET]
    index(req, res){
        OrderCancel.find({})
        .then(orderCancels => res.json(orderCancels))
        .catch(error => next(error));
        // res.render('OrderCancels');
    }
    // [POST] 
    create(req, res, next) {
        const orderCancel = new OrderCancel(req.body);
        orderCancel.save(function(err){
            if(!err) res.send('Create OrderCancel successfully!!');
            else res.send('Create OrderCancel failed!!!');
        });
    }
    // [PUT]
    update(req, res, next) {
       OrderCancel.updateOne({ _id: req.params.id }, req.body)
       .then(() => res.send('Update OrderCancel successfully!!'))
       .catch(error => next(error));
        
    }
    // [DELETE] 
    delete(req, res, next) {
        OrderCancel.deleteOne({ _id: req.params.id })
        .then(() => res.send('Delete OrderCancel successfully!!'))
        .catch(error => next(error));
         
     }


}

module.exports = new OrderCancelsController;