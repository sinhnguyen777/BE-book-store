const { restart } = require('nodemon');
const RoleModel = require('../models/roles.model');

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

exports.createNew = async (values) => {
    try{
        const nameCata = values.nameCata
        let newCata = new RoleModel({
            nameCata
        })
        return newCata.save((err) => {
            if(err){
                console.log(err)
                console.log('Add user fail!');
            }else{
                console.log('Add user success!');
            }
        })
    }
    catch(err){
        console.log(err)
    }

}

exports.delete = async (id)=>{
    try{
        const Cata = await this.getById(id);
        if(!Cata){
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
