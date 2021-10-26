const ProductService = require('../services/products.service');
const CatalogService = require('../services/catalogs.service');

module.exports.GetAll = async (req,res,next)=>{
    try{
        const Products = await ProductService.getAll();
        
        return res.status(200).json({code:"200",message:"sucsses",data:[Products]});
        
        // res.status(404).json({code:"404",message:"fail"});
    }catch(err){
        console.log(err);
    }
}

module.exports.getByIdCata = async (req,res,next)=>{
    try{
        const Products = await ProductService.getByIdCata();
        
        return res.status(200).json({code:"200",message:"sucsses",data:[Products]});
        
        // res.status(404).json({code:"404",message:"fail"});
    }catch(err){
        console.log(err);
    }
}

module.exports.detailBySlug = async (req,res,next) => {
    try{
        const slug = req.params.slug;
        const ProductsDetail = await ProductService.findBySlug(slug);
        return res.status(200).json({code:"200",message:"sucsses",data:[ProductsDetail]});

    }
    catch(err){
        console.log(err)
    }
}

module.exports.create = async(req,res,next)=>{
    try{
        let value = req.body
        const checkIdCata = await CatalogService.getById(value.idCatalog);
        if(checkIdCata){
            res.json("true")
        }
            res.json("false")
        // await ProductService.createNew(value);
        // res.status(200).json({code:"200",message:"sucsses"});
        }catch(err){
        console.log(err);
    }
}

module.exports.delete = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const DelProduct = await ProductService.delete(id);
        if(!DelProduct){
            res.json({code:"404",message:"Product not foud"})
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
        const UpdateProduct = await ProductService.update(id,value);
        if(!UpdateProduct){
            res.json({code:"404",message:"Catalogs not found"})
        }
        res.json({code:"200",message:"sucsses"})
    }catch(err){
        console.log(err);
    }
}

