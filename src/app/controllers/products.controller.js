const ProductService = require('../services/products.service');
const CatalogService = require('../services/catalogs.service');

module.exports.GetAll = async (req,res,next)=>{
    try{
        const Products = await ProductService.getAll();
        
        return res.status(200).json({code:"200",message:"sucsses",data:Products});
        
        // res.status(404).json({code:"404",message:"fail"});
    }catch(err){
        console.log(err);
    }
}

module.exports.SearchName = async (req,res,next)=>{
    try{
        const search = req.query.nameProduct;
        const ProductsSearch = await ProductService.getNameSearch(search);
        
        return res.status(200).json({code:"200",message:"sucsses",data:ProductsSearch});
        
        // res.status(404).json({code:"404",message:"fail"});
    }catch(err){
        console.log(err);
    }
}

module.exports.SearchAuthor = async (req,res,next)=>{
    try{
        const search = req.query.author;
        const ProductsSearch = await ProductService.getAuthorSearch(search);
        
        return res.status(200).json({code:"200",message:"sucsses",data:ProductsSearch});
        
        // res.status(404).json({code:"404",message:"fail"});
    }catch(err){
        console.log(err);
    }
}

module.exports.getByIdCata = async (req,res,next)=>{
    try{
        const Products = await ProductService.getByIdCata();
        if(!Products){
            return res.status(404).json({code:"404",message:"Catalog not found"});
        }
        return res.status(200).json({code:"200",message:"sucsses",data:Products});
        // res.status(404).json({code:"404",message:"fail"});
    }catch(err){
        console.log(err);
    }
}

module.exports.detailBySlug = async (req,res,next) => {
    try{
        const slug = req.params.slug;
        const ProductsDetail = await ProductService.findBySlug(slug);
        return res.status(200).json({code:"200",message:"sucsses",data:ProductsDetail});

    }
    catch(err){
        console.log(err)
    }
}

module.exports.create = async(req,res,next)=>{
    try{
        let value = req.body;
        if(req.files){
            value.images = []
    
               req.files.forEach((item,i)=>{
                    const obj = {
                        image: item.path,
                        positon : i+1
                    }
                    value.images.push(obj);
               })
              
            }
        const checkIdCata = await CatalogService.getById(value.idCatalog);
        if(checkIdCata){
           await ProductService.createNew(value);
           return res.status(200).json({code:"200",message:"sucsses"})
        }
        console.log();
            return res.status(404).json({code:"404",message:"Catalog not found"});
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
module.exports.update = async (req, res, next) => {
    try{
        // const id = req.params.id;
        let values = req.body;
       console.log(req.body);
        // await tinhThanhService.update(id, values);
        // res.redirect('/provinces')
    }
    catch(err){
        console.log(err)
    }

}

// module.exports.update = async (req,res,next)=>{
//     try{
        
//         const id = req.body;
//         const value = req.body;
//         console.log(req.body);
//         // const UpdateProduct = await ProductService.update(id,value);
//         // if(!UpdateProduct){
//         //    return res.json({code:"404",message:"Catalogs not found"})
//         // }
//         return res.json({code:"200",message:"sucsses"})
//     }catch(err){
//         console.log(err);
//     }
// }

