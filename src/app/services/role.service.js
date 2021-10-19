const { restart } = require('nodemon');
const RoleModel = require('../models/roles.model');
// const permissions = require('./')

exports.getAll = async () => {
    try{
        const Role = await RoleModel.find({});
        return Role
    }
    catch(err){
        console.log(err)
    }
}

exports.getById = async (id) => {
    try{
        const Role = await RoleModel.findById(id);
        return Role    
    }
    catch(err){
        console.log(err)
        return false;
    }
}

exports.getByName = async (name) => {
    try{
        const user = await RoleModel.findOne({name:name});
       if(user){
           return user
       }
       return false
    }
    catch(err){
        console.log(err)
    }
}

exports.createNew = async (nameRole,values) => {
    try{
        const listPermissions = values;
        const name = nameRole;

        let newRole = new RoleModel({
            listPermissions,
            name
        })

        return newRole.save()
        .then(() => {console.log('Add user success!'); return true})
        .catch(error =>{console.log(error); return false;});

        
    }
    catch(err){
        console.log(err)
        return false;
    }

}

exports.delete = async (id)=>{
    try{
        
        const Role = await this.getById(id);
        if(!Role){
            return false
        }
        return await RoleModel.deleteOne({_id: id}, (err) => {
            console.log('Delete success!');
        }).clone()
    }
    catch(err){
        console.log(err)
    }
  
}

exports.update = async (id, values) => {
      return await RoleModel.updateOne({ _id: id }, values)
       .then(() => true)
       .catch(error => false);
}

exports.getPermission = async (idRole)=>{
    const permissions = await RoleModel.findOne({_id:idRole})
    return permissions
} 

exports.addPermission=async(id,values)=>{
    console.log(id, values);
    return await RoleModel.updateOne({ _id: id }, {listPermissions:values})
    .then(() => true)
    .catch(error => false);

}