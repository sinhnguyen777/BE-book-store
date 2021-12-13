const OrderModel = require('../models/orders.model');

exports.getAll = async (filter) => {
    try {

        if (filter.hasOwnProperty('_sort')) {
            const Product = await OrderModel.find(filter).sort({
                [filter.column]: filter.type
            });
            return Product
        }

        const Product = await OrderModel.find(filter);
        return Product
    }
    catch (err) {
        console.log(err)
    }
}

exports.newOrder = async (value) => {
    try{
        const idUser = value.idUser;
        const fullName = value.fullName;
        const phone = value.phone;
        const address = value.address;
        const email = value.email;;
        const total = value.total;
        const cancel = value.cancel;
        const reason = value.reason;

        const newValue = new OrderModel({
            idUser,
            fullName,
            phone,
            address,
            email,
            total,
            cancel,
            reason
        })
        return newValue.save()
        .then((res) => {console.log('Add order success!'); return res})
        .catch(error =>{console.log(error); return false;});

    }
    catch(err){
        console.log(err)
    }
}

exports.getOrderByID = async (id) => {
    try{
        const Order = await OrderModel.findById(id);
        if(!Order){
            return false
        }
        return Order    
    }
    catch(err){
        return false

    }
}

exports.confirmOrder = async (id) => {
    try{
          
    }
    catch(err){
        console.log(err)
    }
}

exports.cancelOrder = async (values) => {
    try{
    }
    catch(err){
        console.log(err)
    }

}

exports.update = async (id, values) => {
    return await OrderModel.updateOne({ _id: id }, values)
     .then(() => true)
     .catch(error => false);
}

