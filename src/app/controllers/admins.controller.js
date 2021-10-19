const AdminService = require('../services/admin.service');
const RoleService = require('../services/role.service');
 
exports.Register = async(req,res,next)=>{
    try{
        const values = req.body;
        // check username
        const checkUsername = await AdminService.getByUserName(values.username);
        if(checkUsername){
            return res.status(404).json({code:"404",message:"Username already exists"});
        }
        // check IdRole
        const checkIdRole = await RoleService.getById(values.idRole);
        if(!checkIdRole){
            return res.status(404).json({code:"404",message:"IdRole does not exist"});
        }
        // add Adimin
        const addAdmin = AdminService.createNew(values);
        if(addAdmin){
            return res.status(200).json({code:"200",message:"Add Admin success"});
        }
        return res.status(404).json({code:"404",message:"IdRole does not exist"});
    }catch{
        res.send(err);
    }
}


exports.Login = async (req,res,next)=>{
    try{
        let values = req.body;
        const Admin = await AdminService.Login(values);
        if (Admin) {
            const jwt = require('jsonwebtoken')
            let token = jwt.sign({username: Admin.username,idRole:Admin.idRole}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '30m'
            }, (err, token) => {
                if (err) {
                    console.log('Token sign failed');
                }else{
                    res.json({data:[Admin],token:token})
                }
            }) 
        }else{
            return res.status(404).json({code:"404",message:"Login fail!"});            
        }
    }catch(err){
        console.log(err);
    }
}




// class AdminsController {

//     // [GET]
//     index(req, res){
//         Admin.find({})
//         .then(admin => res.json(admin))
//         .catch(error => next(error));

//         // res.render('catalogs');
//     }
//     // [POST] 
//     create(req, res, next) {
//         const admin = new Admin(req.body);
//         admin.save(function(err){
//             if(!err) res.send('Create Admin successfully!!');
//             else res.send('Create Admin failed!!!');
//         });
        
//     }
//     // [PUT]
//     update(req, res, next) {
//         Admin.updateOne({ _id: req.params.id }, req.body)
//        .then(() => res.send('Update Admin successfully!!'))
//        .catch(error => next(error));
        
//     }
//     // [DELETE] 
//     delete(req, res, next) {
//         Admin.deleteOne({ _id: req.params.id })
//         .then(() => res.send('Delete Admin successfully!!'))
//         .catch(error => next(error));
         
//      }


// }

// module.exports = new AdminsController;