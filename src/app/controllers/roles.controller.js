const RoleService = require('../services/role.service');
const Permission = require('../services/permissions.service');

module.exports.GetAll = async (req,res,next)=>{
    try{
        const Role = await RoleService.getAll();
        
        return res.status(200).json({code:"200",message:"sucsses",data:[Role]});
        
        // res.status(404).json({code:"404",message:"fail"});
    }catch(err){
        console.log(err);
    }
}

module.exports.create = async(req,res,next)=>{
    try{
        const name = req.body.name;
        const checkName = await RoleService.getByName(name);
        if(checkName){
            return res.status(404).json({code:"404",message:"Tên đã tồn tại"}) 
        }
        const ListPermission = [];
        const List = await Permission.getAll();
        List.map(item => ListPermission.push({idPermissions:item.id,name:item.name}))
        const Add = await RoleService.createNew(req.body.name,ListPermission);
        if(Add){
            return res.status(200).json({code:"200",message:"Add user success!"})
        }
        return res.status(404).json({code:"404",message:"Add user fail!"})
      
    }catch(err){
        console.log(err);
    }
}

module.exports.delete = async(req,res,next)=>{
    try{
        const id = req.params.id;
        if(id=="616e9df24610dc3e93caa27f"){
            return res.status(501).json({code:"501",message:"không thể xóa admin"});
        }
        const DelRole = await RoleService.delete(id);
        if(!DelRole){
           return res.json({code:"404",message:"Role not foud"})
        }
        return res.json({code:"200",message:"sucsses"})
        // res.status(200).json({code:"200",message:"sucsses"});
    }catch(err){
        console.log(err);
    }
}

module.exports.update = async (req,res,next)=>{
    try{
        const {id} = req.body;
        const value = req.body;
        const UpdateRole= await RoleService.update(id,value);
        if(!UpdateRole){
            res.json({code:"404",message:"Role not found"})
        }
        res.json({code:"200",message:"sucsses"})
    }catch(err){
        console.log(err);
    }
}
