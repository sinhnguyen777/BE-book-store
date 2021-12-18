const OrderDetailModel = require('../../models/orderDetails.model');
const OrderModel = require('../../models/orders.model');

exports.getAllOrder = async (filter) => {
    try {
        const Order = await OrderModel.find(filter).count();
        return Order
    }
    catch (err) {
        console.log(err)
    }
}

exports.getAllOrderWeek = async () => {
    try {
        const Order = await OrderModel.aggregate([
            {
                $group: {
                    _id: { Date: { $dayOfMonth: "$createdAt" }, Month: { $month: "$createdAt" } },
                    Total: { $sum: 1 }
                },
            },
            {
                $sort: {
                    "_id.Month": -1,
                    "_id.Date":-1,
                }
            }
        ])
        return Order;
    }
    catch (err) {
        console.log(err)
    }
}

exports.GetAllrevenue = async () => {
    try {
        const Order = await OrderDetailModel.aggregate(
            [
              {
                $group:
                  {
                    _id: null ,
                    totalAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
                    count: { $sum: 1 }
                  }
              }
            ]
         )
        return Order;
    }
    catch (err) {
        console.log(err)
    }
}