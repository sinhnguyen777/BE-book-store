const DiscountCode = require('../models/discountCode.model');

class DiscountCodeController {

    // [GET]
    index(req, res){
        DiscountCode.find({})
        .then(discountCodes => res.json(discountCodes))
        .catch(error => next(error));

        // res.render('catalogs');
    }
    // [POST] 
    create(req, res, next) {
        const discountCode = new DiscountCode(req.body);
        discountCode.save();
        res.send('Save');
        
    }
    // [PUT]
    update(req, res, next) {
        DiscountCode.updateOne({ _id: req.params.id }, req.body)
       .then(() => res.send('Update'))
       .catch(error => next(error));
        
    }
    // [DELETE] 
    delete(req, res, next) {
        DiscountCode.deleteOne({ _id: req.params.id })
        .then(() => res.send('Delete'))
        .catch(error => next(error));
         
     }


}

module.exports = new DiscountCodeController;