const jwt = require('jsonwebtoken');
const RoleService = require('../services/role.service')

module.exports.checkAuthencation = function(req, res, next){
    try{
        const token = req.headers['authorization'];
        // const token = authorizationHeader.split(' ')[1];        
        // console.log(token);
        if(token){
            const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            if(check){
                next()
            }else {
                return res.status(401).json({status:401,message:"token expired"})
            }
        }else{
            return res.status(401).json({status:401,message:"token expired"})
        }
    }catch(err){
        console.log(err);
        return res.status(405).json({status:405,message:"Token verify failed"})
    }
}

module.exports.checkAdmin = function(req, res, next){
    try{
        const token = req.headers['authorization'];
        if(token){
            const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if(check){
                if(check.idRole=="616e9df24610dc3e93caa27f"){
                    next()
                }else{
                    return res.send("fail")
                }
            }else {
                return res.send("fail")
            }
        }else{
            return res.send("not token")
        }
    }catch(err){
        return res.status(405).json({status:405,message:"Token verify failed"})
        // return res.redirect('/users/login')
    }
}

module.exports.checkRoleDelCata = async function(req,res,next){
    try{
        const token = req.headers['authorization'];
        if(token){
            const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const checkRole = await RoleService.getPermission(check.idRole);
            // console.log(checkRole);
            const getPermission = checkRole.listPermissions.filter(item=>item.idPermissions == "617569371dc6751ed1cfb13d");
            console.log(getPermission[0].status);
            if(getPermission[0].status){
              return next()
            }
             return res.status(403).json({status:403,message:"not authorization"})
        }else{
            return res.send("not token")
        }
    }catch(err){
        console.log(err);
        return res.status(405).json({status:405,message:"Token verify failed"})
        // return res.redirect('/users/login')
    }
}
