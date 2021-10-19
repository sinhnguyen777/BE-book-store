const PermissionService = require('../services/permissions.service');

module.exports.GetAll = async (req,res,next)=>{
    try{
        const Permission = await PermissionService.getAll();
        
        return res.status(200).json({code:"200",message:"sucsses",data:[Permission]});
        
        // res.status(404).json({code:"404",message:"fail"});
    }catch(err){
        console.log(err);
    }
}

module.exports.create = async(req,res,next)=>{
    try{
        let value = req.body
        await PermissionService.createNew(value);
        res.status(200).json({code:"200",message:"sucsses"});
        }catch(err){
        console.log(err);
    }
}

module.exports.delete = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const DelPermission = await PermissionService.delete(id);
        if(!DelPermission){
            res.json({code:"404",message:"Prmission not foud"})
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
        const UpdatePermission= await PermissionService.update(id,value);
        if(!UpdatePermission){
            res.json({code:"404",message:"Prmission not found"})
        }
        res.json({code:"200",message:"sucsses"})
    }catch(err){
        console.log(err);
    }
}