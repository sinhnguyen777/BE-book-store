const ChapterModel = require('../models/chapter.model');

exports.getAll = async () => {
    try{
        const chapter = await ChapterModel.find({});
        return chapter
    }
    catch(err){
        console.log(err)
    }
}

exports.getById = async (id) => {
    try{
        const chapter = await ChapterModel.findById(id);
        if(!chapter){
            return false
        }
        return chapter    
    }
    catch(err){
        console.log(err)
    }
}

exports.getByIdProduct = async (id) => {
    try{
        const chapter = await ChapterModel.find({idProduct:id}); 
       if(chapter){
           return chapter;
       }
       return false
    }
    catch(err){
        console.log(err)
    }
}

exports.createNew = async (values) => {
    try{
        const nameChapter = values.nameChapter
        const idProduct = values.idProduct
        const content = values.content
        const stt = values.stt
        let newChapter = new ChapterModel({
            nameChapter,
            idProduct,
            content,
            stt
        })
        return newChapter.save((err) => {
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
        const chapter = await this.getById(id);
        if(!chapter){
            return false
        }
        return await ChapterModel.deleteOne({_id: id}, (err) => {
                    console.log('Delete success!');
        }).clone()
    }
    catch(err){
        console.log(err)
    }
  
}

exports.update = async (id, values) => {
      return await ChapterModel.updateOne({ _id: id }, values)
       .then(() => true)
       .catch(error => false);
}
