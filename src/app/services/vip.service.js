const vipModel = require('../models/vip.model');

exports.getAll = async (filter) => {
    try{
        const Cata = await vipModel.find(filter);
        return Cata
    }
    catch(err){
        console.log(err)
    }
}

exports.getById = async (id) => {
    try{
        const Cata = await vipModel.findById(id);
        if(!Cata){
            return false
        }
        return Cata    
    }
    catch(err){
        return false

    }
}


exports.createNew = async (values) => {
    try{
        const name = values.name
        const price = values.price
        const time = values.time
        let newVip = new vipModel({
            name,
            price,
            time
        })
        return newVip.save((err) => {
            if(err){
                console.log(err)
                console.log('Add vip fail!');
            }else{
                console.log('Add vip success!');
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
        return await vipModel.deleteOne({_id: id}, (err) => {
            console.log('Delete success!');
        }).clone()
    }
    catch(err){
        console.log(err)
    }
  
}

exports.update = async (id, values) => {
      return await vipModel.updateOne({ _id: id }, values)
       .then(() => true)
       .catch(error => false);
}
