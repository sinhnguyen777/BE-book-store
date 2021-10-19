const AdminService = require('../models/admins.model');

exports.getAll = async () => {
    try{
        const ListAdmin = await AdminService.find({});
        return ListAdmin
    }
    catch(err){
        console.log(err)
    }
}

exports.getByEmail = async (Email) => {
    try{
        const user = await AdminService.find({email:Email});
       if(user){
           return user
       }
       return fales
    }
    catch(err){
        console.log(err)
    }
}

exports.getByUserName = async (Username) => {
    try{
        const Admin = await AdminService.findOne({username:Username});
       if(Admin){
           return Admin
       }
       return false;
    }
    catch(err){
        return false;
        // console.log(err);
        console.log(err);
    }
}

exports.createNew = async (values) => {
    try{
        const bcrypt = require("bcrypt");      
        var salt = bcrypt.genSaltSync(10);
        const fullName = values.fullName
        const username = values.username
        const password = values.password
        const idRole = values.idRole
    
        const passwordHashed = bcrypt.hashSync(password, salt);
        let newAdmin = new AdminService({
            fullName,
            username,
            password:passwordHashed,
            idRole
        })
        return newAdmin.save()
        .then(() => {console.log('Add Admin success!'); return true})
        .catch(error =>{console.log(error); return false;});
    }
    catch(err){
        console.log(err)
        return false
    }

}

exports.Login = async (values) =>{
    try{
        const { username ,password } = values
        const user = await AdminService.findOne({username:username})
        if(!user){
            return {success: false, error:'Adimin not found'}
        }else {
            const bcrypt = require("bcrypt");        
            const password_db = user.password
            const passwordCompared = bcrypt.compareSync(password, password_db)
            if(!passwordCompared){
                return false;
            }else{
                return user
            }
        }
    }catch(err){
        console.log(err)
    }
}


// (err) => {
//     if(err){
//         console.log(err)
//         console.log('Add user fail!');
//         return false;
//     }else{
//         console.log('Add user success!');
//         return true;
//     }
// }