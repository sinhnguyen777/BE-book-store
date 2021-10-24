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
                return res.status(401).json({status:401,message:"Vui lòng đăng nhập để tiếp tục !!"})
                // return res.render('authentication',{ title: 'Đăng nhập', message: 'Vui lòng đăng nhập để tiếp tục' })
            }
        }else{
            return res.status(401).json({status:401,message:"Vui lòng đăng nhập để tiếp tục !!"})
            // return res.render('authentication',{ title: 'Đăng nhập', message: 'Vui lòng đăng nhập để tiếp tục' })
        }
    }catch(err){
        console.log(err);
        res.json({status:404,message:"Token verify failed"})
    }
}

module.exports.checkAdmin = function(req, res, next){
    try{
        const token = req.headers['authorization'];
        if(token){
            const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if(check){
                if(check.idRole=="61506f1c55d26a31b1466a7c"){
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
        res.json({status:404,message:"Token verify failed"})
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
            const getPermission = checkRole.listPermissions.filter(item=>item.idPermissions == "616e747c69a664a2de4ab343");
            console.log(getPermission);
            if(getPermission[0].status){
               return res.send("true");
            }
            return res.send('false')
            // if(check){
            //     if(check.idRole=="61506f1c55d26a31b1466a7c"){
            //         next()
            //     }else{
            //         return res.send("không đủ quyền để truy cập")
            //     }
            // }else {
            //     return res.send("Token hết hạn")
            // }
        }else{
            return res.send("not token")
        }
    }catch(err){
        res.json({status:404,message:"Token verify failed"})
        // return res.redirect('/users/login')
    }
}
