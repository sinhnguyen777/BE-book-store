const permissionModel = require('../models/permissions.model');

exports.getAll = async () => {
    try{
        const Permission = await permissionModel.find({});
        return Permission
    }
    catch(err){
        console.log(err)
    }
}

exports.getById = async (id) => {
    try{
        const Permission = await permissionModel.findById(id);
        return Permission    
    }
    catch(err){
        console.log(err)
    }
}


exports.createNew = async (values) => {
    try{
        const name = values.name
        let newPermission = new permissionModel({
            name
        })
        return newPermission.save((err) => {
            if(err){
                console.log(err)
                console.log('Add  fail!');
            }else{
                console.log('Add success!');
            }
        })
    }
    catch(err){
        console.log(err)
    }

}

exports.delete = async (id)=>{
    try{
        const Permission = await this.getById(id);
        if(!Permission){
            return false
        }
        return await permissionModel.deleteOne({_id: id}, (err) => {
                    console.log('Delete success!');
        }).clone()
    }
    catch(err){
        console.log(err)
    }
  
}

exports.update = async (id, values) => {
      return await permissionModel.updateOne({ _id: id }, values)
       .then(() => true)
       .catch(error => false);
}
