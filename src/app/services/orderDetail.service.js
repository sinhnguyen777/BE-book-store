const OrderDetailModel = require('../models/orderDetails.model');

exports.newOrder = async (value) => {
    try{
        const idProduct = value.idProduct;
        const idOrder = value.idOrder;
        const idUser = value.idUser;
        const quantity = value.quantity;
        const price = value.price;

        const newValue = new OrderDetailModel({
            idProduct,
            idOrder,
            idUser,
            quantity,
            price,
        })
        return newValue.save()
        .then(() => {console.log('Add order success!'); return true})
        .catch(error =>{console.log(error); return false;});

    }
    catch(err){
        console.log(err)
    }
}

exports.getOrderByID = async (id) => {
    try{
        const Order = await OrderDetailModel.find({idOrder:id});
        if(!Order){
            return false
        }
        return Order    
    }
    catch(err){
        return false

    }
}

exports.getAll = async (filter) => {
    try {
        const Order = await OrderDetailModel.find(filter);
        return Order
    }
    catch (err) {
        console.log(err)
    }
}

