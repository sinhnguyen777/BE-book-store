const jwt = require('jsonwebtoken');

module.exports.checkAuthencation = function(req, res, next){
    try{
        const authorizationHeader = req.headers['authorization'];
        const token = authorizationHeader.split(' ')[1];        
        if(token){
            const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            if(check){
                next()
            }else {
                return res.status(401).json({status:401,message:"Vui lòng đăng nhập để tiếp tục"})
                // return res.render('authentication',{ title: 'Đăng nhập', message: 'Vui lòng đăng nhập để tiếp tục' })
            }
        }else{
            return res.status(401).json({status:401,message:"Vui lòng đăng nhập để tiếp tục"})
            // return res.render('authentication',{ title: 'Đăng nhập', message: 'Vui lòng đăng nhập để tiếp tục' })
        }
    }catch(err){
        console.log(err);
        res.json({status:404,message:"Token verify failed"})
    }
}