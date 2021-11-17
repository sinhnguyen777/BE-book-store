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
                expiresIn: '24h'
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

exports.changePassword = async (req,res,next)=>{
    try{
        const id = req.body.id;
        let values = req.body;
        const change = await AdminService.changePassword(id, values);
        console.log(change);
        if(change){
           return res.status(200).json({code:"200",message:"Update success!"});
        }
        return res.status(401).json({code:"401",message:"wrong password"});
    }catch(err){
        console.log(err);
    }
}

exports.forgotpassword = async(req,res,next)=>{
    try{
        const email = req.body.email;
        const user = await AdminService.getByEmail(email);
        if(!user){
           return res.status(401).json({code:"401",message:"Account does not exist"});
        }

        const nodemailer = require('nodemailer')
        const jwt = require('jsonwebtoken')
        let token = jwt.sign({userId: user[0]._id }, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15m' /*<---- this is 5 minutes */
        }, (err, token) => {
            if (err) {
                console.log('Token sign failed');
            }else{
                var transporter =  nodemailer.createTransport({ // config mail server
                    service:"gmail",  
                    auth: {
                        user: 'congndps11796@fpt.edu.vn',
                        pass: 'duccong14102001'
                    },
                    tls: {rejectUnauthorized:false}  
                });

                var mainOptions = { 
                    from: 'congndps11796@fpt.edu.vn',
                    to: user[0].email,
                    subject: `Kính gửi Ông/Bà ${user[0].fullName}.`,
                    text: `Xác nhận`,
                    html: `<h4>SmartSign - Khôi phục mật khẩu</h4>
                    <body style="background:#e1e5e8" style="margin-top:0 ;margin-bottom:0 ;margin-right:0 ;margin-left:0 ;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;background-color:#e1e5e8;">
            
                    <center style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#e1e5e8;">
                    <div style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;">
                        <table align="center" cellpadding="0" style="border-spacing:0;font-family:'Muli',Arial,sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;">
                        <tbody>
                            <tr>
                            <td align="center" class="vervelogoplaceholder" height="143" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;height:143px;vertical-align:middle;" valign="middle"><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%22160%22%2C%22height%22%3A34%2C%22alt_text%22%3A%22Verve%20Wine%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/79d8f4f889362f0c7effb2c26e08814bb12f5eb31c053021ada3463c7b35de6fb261440fc89fa804edbd11242076a81c8f0a9daa443273da5cb09c1a4739499f.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="#" target="_blank"><img alt="Verve Wine" height="34" src="https://marketing-image-production.s3.amazonaws.com/uploads/79d8f4f889362f0c7effb2c26e08814bb12f5eb31c053021ada3463c7b35de6fb261440fc89fa804edbd11242076a81c8f0a9daa443273da5cb09c1a4739499f.png" style="border-width: 0px; width: 160px; height: 34px;" width="160"></a></span></td>
                            </tr>
                            <!-- Start of Email Body-->
                            <tr>
                            <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#ffffff;">
                                <!--[if gte mso 9]>
                                    <center>
                                    <table width="80%" cellpadding="20" cellspacing="30"><tr><td valign="top">
                                    <![endif]-->
                                <table style="border-spacing:0;" width="100%">
                                <tbody>
                                    <tr>
                                    <td align="center" class="inner" style="padding-top:15px;padding-bottom:15px;padding-right:30px;padding-left:30px;" valign="middle"><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%22255%22%2C%22height%22%3A93%2C%22alt_text%22%3A%22Forgot%20Password%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/35c763626fdef42b2197c1ef7f6a199115df7ff779f7c2d839bd5c6a8c2a6375e92a28a01737e4d72f42defcac337682878bf6b71a5403d2ff9dd39d431201db.png%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><img alt="Forgot Password" class="banner" height="93" src="https://marketing-image-production.s3.amazonaws.com/uploads/35c763626fdef42b2197c1ef7f6a199115df7ff779f7c2d839bd5c6a8c2a6375e92a28a01737e4d72f42defcac337682878bf6b71a5403d2ff9dd39d431201db.png" style="border-width: 0px; margin-top: 30px; width: 255px; height: 93px;" width="255"></span></td>
                                    </tr>
                                    <tr>
                                    <td class="inner contents center" style="padding-top:15px;padding-bottom:15px;padding-right:30px;padding-left:30px;text-align:left;">
                                        <center>
                                        <p class="h1 center" style="Margin:0;text-align:center;font-family:'flama-condensed','Arial Narrow',Arial;font-weight:100;font-size:30px;Margin-bottom:26px;">Quên mật khẩu?</p>
                                        <!--[if (gte mso 9)|(IE)]><![endif]-->
                
                                        <p class="description center" style="font-family:'Muli','Arial Narrow',Arial;Margin:0;text-align:center;max-width:320px;color:#a1a8ad;line-height:24px;font-size:15px;Margin-bottom:10px;margin-left: auto; margin-right: auto;"><span style="color: rgb(161, 168, 173); font-family: Muli, Arial; font-size: 15px; text-align: center; background-color: rgb(255, 255, 255);">Đừng lo lắng! Hãy truy cập vào đây để khôi phục mật khẩu</span></p>
                                        <!--[if (gte mso 9)|(IE)]><br>&nbsp;<![endif]--><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%22260%22%2C%22height%22%3A54%2C%22alt_text%22%3A%22Reset%20your%20Password%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/c1e9ad698cfb27be42ce2421c7d56cb405ef63eaa78c1db77cd79e02742dd1f35a277fc3e0dcad676976e72f02942b7c1709d933a77eacb048c92be49b0ec6f3.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D">
                                         ${token}</span>
                                        <!--[if (gte mso 9)|(IE)]><br>&nbsp;<![endif]--></center>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                                <!--[if (gte mso 9)|(IE)]>
                                    </td></tr></table>
                                    </center>
                                    <![endif]-->
                            </td>
                            </tr>
                            <!-- End of Email Body-->
                            
                        </tbody>
                        </table>
                    </div>
                    </center>
            
                
                </body>
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
        }) 

    }catch(err){
        console.log(err);
    }
}

module.exports.resetPassword = async (req, res, next) => {
    const token = req.body.token;
    const password = req.body.password;
    const jwt = require('jsonwebtoken');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, decode)=>{
        if(err){
            return res.status(401).json({code:401,message:"Qúa thời hạn xác thực"})
        }else{
            const add = await AdminService.NewPass(decode.userId,password);
            if(add){
                return res.status(200).json({code:200,message:"Xác thực thành công"})
            }
            return res.status(401).json({code:401,message:"đổi mật khẩu thất bại"})
        }
    })
}
