const commentModel = require('../models/comment.model');

exports.getAll = async () => {
    try{
        const comment = await commentModel.find({});
        return comment
    }
    catch(err){
        console.log(err)
    }
}

exports.getById = async (id) => {
    try{
        const comment = await commentModel.findById(id);
        if(!comment){
            return false
        }
        return comment    
    }
    catch(err){
        return false

    }
}

exports.createNew = async (values) => {
    try{
        const content = values.content
        const idUser = values.idUser
        const idProduct = values.idProduct
        const like = values.like
        let newComment = new commentModel({
            content,
            idUser,
            idProduct,
            like
        })
        return newComment.save((err) => {
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
        const comment = await this.getById(id);
        if(!comment){
            return false
        }
        return await commentModel.deleteOne({_id: id}, (err) => {
            console.log('Delete success!');
        }).clone()
    }
    catch(err){
        console.log(err)
    }
  
}

exports.update = async (id, values) => {
      return await commentModel.updateOne({ _id: id }, values)
       .then(() => true)
       .catch(error => false);
}
