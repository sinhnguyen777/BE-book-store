const jwt = require('jsonwebtoken');

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
        console.log(token);
        if(token){
            const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if(check){
                console.log(check.idRole);
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
        console.log('Token verify failed')
        // return res.redirect('/users/login')
    }
}
