const UserService = require('../services/user.service');
const dotenv = require('dotenv');
dotenv.config();

exports.getAll = async (req,res,next)=>{
    try{    
        const ListUser = await UserService.getAll();
        return res.status(200).json({code:"200",message:"sucsses",data:ListUser});
    }catch(err){
        res.send(err)
        // console.log(err);
    }
}

exports.Register = async(req,res,next)=>{
    try{
        const values = req.body;
        const user = await UserService.getByEmail(values.email); 
        if(user.length>0){
            return res.json({message:'Tài khoản đã tồn tại!!'})
        }

        //Send Mail Xác thực
        const nodemailer = require('nodemailer');
        const jwt = require('jsonwebtoken')
        const token =  jwt.sign(values,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"2m"},(err,token)=>{
            if(err){
                return res.json("Token sign failed");
            }else{
                var transporter =  nodemailer.createTransport({ // config mail server
                    service:"gmail",  
                    auth: {
                        user: 'chapterone.bookstoreteam@gmail.com',
                        pass: 'bookstore'
                    },
                    tls: {rejectUnauthorized:false}  
                });
                
                var mainOptions = { 
                    from: 'chapterone.bookstoreteam@gmail.com',
                    to: values.email,
                    subject: `Kính gửi Ông/Bà ${values.fullName}.`,
                    text: `Xác nhận Đăng ký Tài khoản`,
                    html: `<h4> Cửa Hàng Sách BookStore trân trọng cám ơn quý khách hàng đã tin tưởng sử dụng dịch vụ của cửa hàng chúng tôi.</h4>
                    <h2>Quý khách hàng vui lòng truy cập đường link để xác nhận thông tin:</h2>
                    <a href="#">
                        ${token}
                    </a>
                    `
                }

                transporter.sendMail(mainOptions,  function(err, info){
                    if (err) {
                        console.log(err);
                        return res.status(404).json(`can't send mail`);
                    } else {
                        return res.status(200).json({code:"200",'Message sent: ':info.response})
                    }
                });

            }
        });
        
    }catch(err){
        res.send(err)
        // console.log(err);
    }
}

exports.VerifyEmail = async(req,res,next)=>{
    try{
        const token = req.body.token;
        const jwt = require('jsonwebtoken')
    
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, async(err,data)=>{
            if(err) res.sendStatus(403);
            const addUser = await UserService.createNew(data);
            if(addUser){
                return res.status(200).json({code:"200",message:"Add user success!"});
            }
                return res.status(404).json({code:"404",message:"Add user fail!"});    
        })
    }catch(err){
        res.send(err)
    }
}

exports.Login = async (req, res, next) => {
    try{
        let values = req.body;
        const user = await UserService.Login(values);
        if (user) {
            const jwt = require('jsonwebtoken')
            let token = jwt.sign({email: user.email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '30m'
            }, (err, token) => {
                if (err) {
                    console.log('Token sign failed');
                }else{
                    res.json({data:[user],token:token})
                }
            }) 
        }else{
            return res.status(404).json({code:"404",message:"Login fail!"});            
        }
    } catch (error) {
        // console.log(error);
        res.send(err)        
    }
}
