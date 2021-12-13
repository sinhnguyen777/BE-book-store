const DiscountCodeService = require('../services/discountCode.service');

module.exports.GetAll = async (req,res,next)=>{
    try{
        const Catalogs = await DiscountCodeService.getAll();
        
        return res.status(200).json({code:"200",message:"sucsses",data:Catalogs});
        
        // res.status(404).json({code:"404",message:"fail"});
    }catch(err){
        console.log(err);
    }
}

module.exports.getByIdDiscount= async (req,res,next)=>{
    try{
        const id = req.params.id;
        const DiscountCode = await DiscountCodeService.getById(id);
        if(!DiscountCode){
            return res.status(404).json({code:"404",message:"Catalog not found"});
        }
        return res.status(200).json({code:"200",message:"sucsses",data:DiscountCode});
        // res.status(404).json({code:"404",message:"fail"});

    }catch(err){
        console.log(err);
    }
}

module.exports.create = async(req,res,next)=>{
    try{
        let value = req.body
        await DiscountCodeService.createNew(value);
        res.status(200).json({code:"200",message:"sucsses"});
        }catch(err){
        console.log(err);
    }
}

module.exports.delete = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const DelCata = await DiscountCodeService.delete(id);
        if(!DelCata){
            res.json({code:"404",message:"Catalogs not foud"})
        }
        res.json({code:"200",message:"sucsses"})
        // res.status(200).json({code:"200",message:"sucsses"});
    }catch(err){
        console.log(err);
    }
}

module.exports.update = async (req,res,next)=>{
    try{
        const {id} = req.body;
        const value = req.body;
        const checkId = await DiscountCodeService.getById(id);
        if(!checkId){
            return res.status(404).json({code:"404",message:"Catalogs not found"})
        }
        const UpdateCata = await DiscountCodeService.update(id,value);
        if(!UpdateCata){
            return res.status(404).json({code:"404",message:"Catalogs not found"})
        }
        res.json({code:"200",message:"sucsses"})
    }catch(err){
        console.log(err);
    }
}

