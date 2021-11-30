const ChapterService = require('../services/chapter.service');

module.exports.GetAll = async (req,res,next)=>{
    try{
        const Chapters = await ChapterService.getAll();
        
        return res.status(200).json({code:"200",message:"sucsses",data:Chapters});
        
        // res.status(404).json({code:"404",message:"fail"});
    }catch(err){
        console.log(err);
    }
}

module.exports.getByIdProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const Chapter = await ChapterService.getByIdProduct(id);
        if (!Chapter) {
            return res.status(404).json({ code: "404", message: "Products not found" });
        }
        return res.status(200).json({ code: "200", message: "sucsses", data: Chapter });
        // res.status(404).json({code:"404",message:"fail"});
    } catch (err) {
        console.log(err);
    }
}

module.exports.create = async(req,res,next)=>{
    try{
        let value = req.body
        await ChapterService.createNew(value);
        res.status(200).json({code:"200",message:"sucsses"});
        }catch(err){
        console.log(err);
    }
}

module.exports.delete = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const DelCata = await ChapterService.delete(id);
        if(!DelCata){
            res.json({code:"404",message:"Chapters not foud"})
        }
        res.json({code:"200",message:"sucsses"})
        // res.status(200).json({code:"200",message:"sucsses"});
    }catch(err){
        console.log(err);
    }
}

module.exports.update = async (req,res,next)=>{
    try{
        const {id} = req.body;
        const value = req.body;
        const checkId = await ChapterService.getById(id);
        if(!checkId){
            return res.status(401).json({code:"401",message:"Chapters not found"})
        }
        const UpdateCata = await ChapterService.update(id,value);
        if(!UpdateCata){
            return res.status(401).json({code:"401",message:"Chapters not found"})
        }
        res.json({code:"200",message:"sucsses"})
    }catch(err){
        console.log(err);
    }
}

