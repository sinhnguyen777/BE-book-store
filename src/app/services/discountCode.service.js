const discountCodeModel = require('../models/discountCode.model');

exports.getAll = async () => {
    try{
        const Cata = await discountCodeModel.find({});
        return Cata
    }
    catch(err){
        console.log(err)
    }
}

exports.getById = async (id) => {
    try{
        const Cata = await discountCodeModel.findById(id);
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
        const code = values.code
        const percent = values.percent
        const dateStart = values.dateStart
        const dateEnd = values.dateEnd
        const status = values.status
        let newCata = new discountCodeModel({
            idUser,
            code,
            percent,
            dateStart,
            dateEnd,
            status,
        })
        return newCata.save((err) => {
            if(err){
                console.log(err)
                console.log('Add discountCode fail!');
            }else{
                console.log('Add discountCode success!');
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
        return await discountCodeModel.deleteOne({_id: id}, (err) => {
                    console.log('Delete success!');
        }).clone()
    }
    catch(err){
        console.log(err)
    }
  
}

exports.update = async (id, values) => {
      return await discountCodeModel.updateOne({ _id: id }, values)
       .then(() => true)
       .catch(error => false);
}
exports.newCoupon = async (id, values) => {
    try{
        const idUser = values.idUser
        const code = values.code
        const percent = values.percent
        const dateStart = values.dateStart
        const dateEnd = values.dateEnd
        const status = values.status
        let newCata = new discountCodeModel({
            idUser,
            code,
            percent,
            dateStart,
            dateEnd,
            status,
        })
        return newCata.save((err) => {
            if(err){
                console.log(err)
                console.log('Add discountCode fail!');
            }else{
                console.log('Add discountCode success!');
            }
        })
    }
    catch(err){
        console.log(err)
    }
}
