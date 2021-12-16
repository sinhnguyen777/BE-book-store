const OrderDetailService = require('../services/orderDetail.service');
const ProductService = require('../services/products.service');

module.exports.NewOrderDetail = async (req,res,next)=>{
    try{
        const value = req.body;
        const Order = await OrderDetailService.newOrder(value);
        res.json(Order)
        
        // return res.status(200).json({code:"200",message:"sucsses"});
        
        // res.status(404).json({code:"404",message:"fail"});
    }catch(err){
        console.log(err);
    }
}

module.exports.GetId = async (req, res, next) => {
    try {
        const id = req.params.id
        
        console.log(1)
        
        const Order = await OrderDetailService.getOrderByID(id);
        let newOrder = []
        await Order.map( async (item)=>{
            let newOrder = {}
            const dataProductDetail = await ProductService.getById(item.idProduct)
              newItem= await {...item,...dataProductDetail}
            await newOrder.push(newItem)
        })
        return res.status(200).json({ code: "200", message: "sucsse", data: newOrder });

        // res.status(404).json({code:"404",message:"fail"});
    } catch (err) {
        console.log(err);
    }
}


