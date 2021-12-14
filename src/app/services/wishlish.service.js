const wishlishModel = require('../models/wishlish.model');

exports.getAll = async (value) => {
    try{
        const wishlish = await wishlishModel.find(value);
        return wishlish
    }
    catch(err){
        console.log(err)
    }
}

exports.getById = async (id) => {
    try{
        const Cata = await wishlishModel.findById(id);
        if(!Cata){
            return false
        }
        return Cata    
    }
    catch(err){
        // console.log(err);
        return false

    }
}


exports.createNew = async (values) => {
    try{
        const idUser = values.idUser
        const idProduct = values.idProduct
        let newCata = new wishlishModel({
            idUser,
            idProduct
        })
        return newCata.save((err) => {
            if(err){
                console.log(err)
                console.log('Add wishlishModel fail!');
            }else{
                console.log('Add wishlishModel success!');
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
        return await wishlishModel.deleteOne({_id: id}, (err) => {
                    console.log('Delete success!');
        }).clone()
    }
    catch(err){
        console.log(err)
    }
  
}
