const OrderModel = require('../models/orders.model');

exports.newOrder = async (value,orderdetail) => {
    try{
        const getDate =  new Date();

        const idUser = value.idUser;
        const orderDetail = orderdetail;
        const phone = value.phone;
        const address = value.address;
        const email = value.email;;
        const total = value.total;
        const dateCreate = getDate;

        const newValue = new OrderModel({
            idUser,
            orderDetail,
            phone,
            address,
            email,
            total,
            dateCreate
        })
        return newValue.save()
        .then(() => {console.log('Add order success!'); return true})
        .catch(error =>{console.log(error); return false;});

    }
    catch(err){
        console.log(err)
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

