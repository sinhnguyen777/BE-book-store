const CommentService = require('../services/comment.service');
const ProductService = require('../services/products.service');
const UserService = require('../services/user.service');

module.exports.GetAll = async (req,res,next)=>{
    try{
        const Catalogs = await CommentService.getAll(req.body.idProduct);
        
        return res.status(200).json({code:"200",message:"sucsses",data:Catalogs});
        
        // res.status(404).json({code:"404",message:"fail"});
    }catch(err){
        console.log(err);
    }
}

module.exports.getByIdCata = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const Catalogs = await CommentService.getById(id);
        if(!Catalogs){
            return res.status(404).json({code:"404",message:"Catalog not found"});
        }
        return res.status(200).json({code:"200",message:"sucsses",data:Catalogs});
        // res.status(404).json({code:"404",message:"fail"});

    }catch(err){
        console.log(err);
    }
}

module.exports.create = async(req,res,next)=>{
    try{
        let value = req.body
        const checkIdProduct = await ProductService.getById(value.idProduct);
        const checkIdUser = await UserService.getById(value.idUser);

        if (checkIdProduct && checkIdUser) {
            await CommentService.createNew(value);
            return res.status(200).json({ code: "200", message: "sucsses" })
        }
        return res.status(404).json({ code: "404", message: "Catalog not found" });
        }catch(err){
        console.log(err);
    }
}

module.exports.delete = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const DelCata = await CommentService.delete(id);
        if(!DelCata){
            res.json({code:"404",message:"Catalogs not foud"})
        }
        res.json({code:"200",message:"sucsses"})
    }catch(err){
        console.log(err);
    }
}

module.exports.update = async (req,res,next)=>{
    try{
        const {id} = req.body;
        const value = req.body;
        const checkId = await CommentService.getById(id);
        if(!checkId){
            return res.status(404).json({code:"404",message:"Catalogs not found"})
        }
        const UpdateCata = await CommentService.update(id,value);
        if(!UpdateCata){
            return res.status(404).json({code:"404",message:"Catalogs not found"})
        }
        res.json({code:"200",message:"sucsses"})
    }catch(err){
        console.log(err);
    }
}

