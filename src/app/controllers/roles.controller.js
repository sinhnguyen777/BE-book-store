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
        const ListPermission = [];
        const List = await Permission.getAll();
        List.map(item => ListPermission.push({idPermissions:item.id,name:item.name}))
        console.log(ListPermission);
        const Add = await RoleService.createNew(req.body.name,ListPermission);
        console.log(Add);
        if(Add){
            return res.status(200).json({code:"200",message:"Add user success!"})
        }
        return res.status(401).json({code:"401",message:"Add user fail!"})
      
    }catch(err){
        console.log(err);
    }
}

module.exports.delete = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const DelRole = await RoleService.delete(id);
        if(!DelRole){
            res.json({code:"404",message:"Role not foud"})
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
        const UpdateRole= await RoleService.update(id,value);
        if(!UpdateRole){
            res.json({code:"404",message:"Role not found"})
        }
        res.json({code:"200",message:"sucsses"})
    }catch(err){
        console.log(err);
    }
}
