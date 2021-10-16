const Order = require('../models/orders.model');

class OrdersController {

    // [GET]
    index(req, res){
        Order.find({})
        .then(orders => res.json(orders))
        .catch(error => next(error));
        // res.render('Oders');
    }
    // [POST] 
    create(req, res, next) {
        const order = new Oder(req.body);
        order.save(function(err){
            if(!err) res.send('Create Oder successfully!!');
            else res.send('Create Oder failed!!!');
        });
    }
    // [PUT]
    update(req, res, next) {
       Order.updateOne({ _id: req.params.id }, req.body)
       .then(() => res.send('Update Oder successfully!!'))
       .catch(error => next(error));
        
    }
    // [DELETE] 
    delete(req, res, next) {
        Order.deleteOne({ _id: req.params.id })
        .then(() => res.send('Delete Oder successfully!!'))
        .catch(error => next(error));
         
     }


}

module.exports = new OrdersController;