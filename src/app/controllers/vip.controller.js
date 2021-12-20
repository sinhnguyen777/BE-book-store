const VipService = require('../services/vip.service');

module.exports.GetAll = async (req,res,next)=>{
    try{
        const Catalogs = await VipService.getAll();
        
        return res.status(200).json({code:"200",message:"sucsses",data:Catalogs});
        
    }catch(err){
        console.log(err);
    }
}

module.exports.getByIdCata = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const Catalogs = await VipService.getById(id);
        if(!Catalogs){
            return res.status(404).json({code:"404",message:"Catalog not found"});
        }
        return res.status(200).json({code:"200",message:"sucsses",data:Catalogs});

    }catch(err){
        console.log(err);
    }
}

module.exports.create = async(req,res,next)=>{
    try{
        let value = req.body
        const filter = {
            name: value.name,
          };
          const checkNameCata = await VipService.getAll(filter);
          if (checkNameCata.length > 0) {
            return res.json({ code: 404, message: "Tên Danh Mục Đã Tồn Tại" });
          }
        await VipService.createNew(value);
        res.status(200).json({code:"200",message:"sucsses"});
        }catch(err){
        console.log(err);
    }
}

module.exports.delete = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const DelCata = await VipService.delete(id);
        if(!DelCata){
            res.json({code:"404",message:"Catalogs not foud"})
        }
        res.json({code:"200",message:"sucsses"})
    }catch(err){
        console.log(err);
    }
}

module.exports.update = async (req,res,next)=>{
    try{
        const {id} = req.body;
        const value = req.body;
        const checkId = await VipService.getById(id);
        if(!checkId){
            return res.status(404).json({code:"404",message:"Catalogs not found"})
        }
        const UpdateCata = await VipService.update(id,value);
        if(!UpdateCata){
            return res.status(404).json({code:"404",message:"Catalogs not found"})
        }
        res.json({code:"200",message:"sucsses"})
    }catch(err){
        console.log(err);
    }
}

