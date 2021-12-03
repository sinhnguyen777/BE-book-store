const OrderService = require('../services/order.service');
const ProductService = require('../services/products.service');

module.exports.NewOrder = async (req,res,next)=>{
    try{
        const value = req.body;
        console.log(value.orderDetail);
        const orderdetail =[];
        await value.orderDetail.map( async(item)=>{
            const check = await ProductService.getById(item.idProduct);
            if(check){
                console.log(item);
                orderdetail.push(item);
            }
        })
        console.log(orderdetail);

        // const Order = await OrderService.newOrder(value,orderdetail);
        
        return res.status(200).json({code:"200",message:"sucsses"});
        
        // res.status(404).json({code:"404",message:"fail"});
    }catch(err){
        console.log(err);
    }
}

module.exports.confirm = async(req,res,next)=>{
    try{
        let value = req.body
        await OrderService.createNew(value);
        res.status(200).json({code:"200",message:"sucsses"});
        }catch(err){
        console.log(err);
    }
}

module.exports.cancel = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const DelOrder = await OrderService.delete(id);
        if(!DelOrder){
            res.json({code:"404",message:"Order not foud"})
        }
        res.json({code:"200",message:"sucsses"})
        // res.status(200).json({code:"200",message:"sucsses"});
    }catch(err){
        console.log(err);
    }
}


