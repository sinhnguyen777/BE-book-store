const StatisticalModel = require('../../services/statistical/statistical.service');

module.exports.GetAll = async (req,res,next)=>{
    try{
        const filter = req.query
        const Order = await StatisticalModel.getAllOrder(filter);
        
        return res.status(200).json({code:"200",message:"sucsses",data:Order});
        
    }catch(err){
        console.log(err);
    }
}


module.exports.GetAllByDate = async (req,res,next)=>{
    try{
        const filter = req.query
        const Order = await StatisticalModel.getAllOrderWeek();
        
        return res.status(200).json({code:"200",message:"sucsses",data:Order});
        
    }catch(err){
        console.log(err);
    }
}


module.exports.GetAllrevenue = async (req,res,next)=>{
    try{
        const Order = await StatisticalModel.GetAllrevenue();
        
        return res.status(200).json({code:"200",message:"sucsses",data:Order});
        
    }catch(err){
        console.log(err);
    }
}

