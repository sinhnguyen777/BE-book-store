const cataModel = require('../models/catalogs.model');

exports.getAll = async () => {
    try{
        const Cata = await cataModel.find({});
        return Cata
    }
    catch(err){
        console.log(err)
    }
}

exports.getById = async (id) => {
    try{
        const Cata = await cataModel.findById(id);
        return Cata    
    }
    catch(err){
        console.log(err)
    }
}

// exports.findBySlug = async (slug) => {
//     try{
//         const Cata = await cataModel.find({slug: slug})
//         if(Cata.length==0) return []
//         return Cata  
//     }
//     catch(err){
//         console.log(err)
//     }
// }

exports.createNew = async (values) => {
    try{
        const nameCata = values.nameCata
        let newCata = new cataModel({
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
        return await cataModel.deleteOne({_id: id}, (err) => {
                    console.log('Delete success!');
        }).clone()
    }
    catch(err){
        console.log(err)
    }
  
}

exports.update = async (id, values) => {
      return await cataModel.updateOne({ _id: id }, values)
       .then(() => true)
       .catch(error => false);
}
