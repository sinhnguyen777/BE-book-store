const OrderDetail = require('../models/OrderDetails.model');

class OrderDetailsController {

    // [GET]
    index(req, res){
        OrderDetail.find({})
        .then(OrderDetails => res.json(OrderDetails))
        .catch(error => next(error));
        // res.render('OrderDetails');
    }
    // [POST] 
    create(req, res, next) {
        const OrderDetail = new OrderDetail(req.body);
        OrderDetail.save(function(err){
            if(!err) res.send('Create OrderDetail successfully!!');
            else res.send('Create OrderDetail failed!!!');
        });
    }
    


}

module.exports = new OrderDetailsController;