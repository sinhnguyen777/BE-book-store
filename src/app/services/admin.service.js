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
       if(user.length > 0){
           return user
       }
       return false
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
        const email = values.email
        const idRole = values.idRole
    
        const passwordHashed = bcrypt.hashSync(password, salt);
        let newAdmin = new AdminService({
            fullName,
            email,
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

module.exports.changePassword = async (id, inputValues) =>{
    const bcrypt = require("bcrypt");      
    var salt = bcrypt.genSaltSync(10);

    const user = await AdminService.findOne({_id:id})
    const password_db = user.password;
    const password = inputValues.password;
    const newPass = inputValues.newPassword;
    const passwordCompared = bcrypt.compareSync(password, password_db)

    if(!passwordCompared){
        console.log("wrong password");
        return false;
    }

    const passwordHashed = bcrypt.hashSync(newPass, salt);
    const newPassword = passwordHashed;

    return await AdminService.updateOne({ _id: id }, {password: newPassword})
    .then(() => true)
    .catch(error => false);
}

module.exports.NewPass = async (id,password)=>{
        console.log(id);
        const bcrypt = require("bcrypt");      
        var salt = bcrypt.genSaltSync(10);
        const passwordHashed = bcrypt.hashSync(password, salt);
        const newPassword = passwordHashed;
        console.log(newPassword);

        return await AdminService.updateOne({ _id: id }, {password: newPassword})
        .then(() => true)
        .catch(error => false);

}
