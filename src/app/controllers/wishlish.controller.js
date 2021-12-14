const WishlishService = require('../services/wishlish.service');
const ProductService = require('../services/products.service');
const UserService = require('../services/user.service');

module.exports.GetAll = async (req,res,next)=>{
    try{
        const filter = req.query
        const wishlish = await WishlishService.getAll(filter);
        
        return res.status(200).json({code:"200",message:"sucsses",data:wishlish});
        
        // res.status(404).json({code:"404",message:"fail"});
    }catch(err){
        console.log(err);
    }
}


module.exports.create = async(req,res,next)=>{
    try{
        let value = req.body
        const checkIdProduct = await ProductService.getById(value.idProduct);
        if(!checkIdProduct){
            return res.json({code :"404", message:"Sản phẩm không tồn tại"})
        }
        const checkIdUser = await UserService.getById(value.idUser);
        if(!checkIdUser){
            return res.json({code:"404",message:"Id người dùng không tồn tại"})
        }
        await WishlishService.createNew(value);
        res.status(200).json({code:"200",message:"sucsses"});
        }catch(err){
        console.log(err);
    }
}

module.exports.delete = async(req,res,next)=>{
    try{
        const id = req.body.id;
        const value = req.body;
        const checkIdUser = await UserService.getById(value.idUser);
        if(!checkIdUser){
            return res.json({code :"404", message:"Bạn Không Thể Xóa Sản Phẩm Trong Danh Sách Không Phải Của Mình"})
        }
        const DelCata = await WishlishService.delete(id);
        if(!DelCata){
            res.json({code:"404",message:"Sản Phẩm Không Tồn Tại"})
        }
        res.json({code:"200",message:"sucsses"})
        // res.status(200).json({code:"200",message:"sucsses"});
    }catch(err){
        console.log(err);
    }
}
