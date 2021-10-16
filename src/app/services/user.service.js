const UserService = require('../models/users.model');

exports.getAll = async () => {
    try{
        const ListUser = await UserService.find({});
        return ListUser
    }
    catch(err){
        console.log(err)
    }
}


exports.getById = async (id) => {
    try{
        const User = await UserService.findById(id);
        return User    
    }
    catch(err){
        console.log(err)
    }
}

exports.getByEmail = async (Email) => {
    try{
        const user = await UserService.find({email:Email});
       if(user){
           return user
       }
       return fales
    }
    catch(err){
        console.log(err)
    }
}

exports.createNew = async (values) => {
    try{
        const bcrypt = require("bcrypt");      
        var salt = bcrypt.genSaltSync(10);
        const fullName = values.fullName
        const email = values.email
        const password = values.password
    
        const passwordHashed = bcrypt.hashSync(password, salt);
        let newUser = new UserService({
                fullName,
                email,
                password:passwordHashed,
        })
        return newUser.save()
        .then(() => {console.log('Add user success!'); return true})
        .catch(error =>{console.log(error); return false;});
    }
    catch(err){
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