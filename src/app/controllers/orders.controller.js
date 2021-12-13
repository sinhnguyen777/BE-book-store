const OrderService = require('../services/order.service');
const ProductService = require('../services/products.service');
const OrderDetailService = require('../services/orderDetail.service');
const UserService = require('../services/user.service');


module.exports.GetAll = async (req, res, next) => {
    try {
        const filter = req.query
        
        const Order = await OrderService.getAll(filter);

        return res.status(200).json({ code: "200", message: "sucsse", data: Order });

        // res.status(404).json({code:"404",message:"fail"});
    } catch (err) {
        console.log(err);
    }
}

module.exports.NewOrder = async (req, res, next) => {
    try {
        const value = req.body;
        const idUser = value.idUser;
        const checkUser = await UserService.getById(idUser)
        if (!checkUser) {
            value.cancel = true;
            value.reason = 'Chưa Xác Thực Email';
            const Order = await OrderService.newOrder(value);
            if (Order) {
                const idOrder = Order._id;
                await value.orderDetail.map(async (item) => {
                    const check = await ProductService.getById(item.idProduct);
                    if (check) {
                        const newValue = {
                            idProduct: item.idProduct,
                            idOrder,
                            idUser,
                            quantity: item.quantity,
                            price: item.price,
                        }
                        await OrderDetailService.newOrder(newValue)
                    }
                });

                const nodemailer = require('nodemailer')
                const jwt = require('jsonwebtoken')
                let token = await jwt.sign({ idOrder: idOrder }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '1d' /*<---- this is 5 minutes */
                }, (err, token) => {
                    console.log(token);
                    if (err) {
                        console.log('Token sign failed');
                    } else {
                        var transporter = nodemailer.createTransport({ // config mail server
                            service: "gmail",
                            auth: {
                                user: 'chapterone.bookstoreteam@gmail.com',
                                pass: 'bookstore'
                            },
                            tls: { rejectUnauthorized: false }
                        });

                        var mainOptions = {
                            from: 'chapterone.bookstoreteam@gmail.com',
                            to: Order.email,
                            subject: `Kính gửi Ông/Bà ${Order.fullName}.`,
                            text: `Xác nhận`,
                            html: `<h4>BookStore - Xác nhận đơn đặt hàng</h4>
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
                                                <a href="http://localhost:3000/admins/reset/${token}" target="_blank"><button alt="Reset your Password" height="54"  style="border-width: 0px;cursor: pointer;background-color: #000 ;color: #eee;margin-top: 30px; margin-bottom: 50px; width: 260px; height: 54px;" width="260">Khôi phục mật khẩu</button></a></span>
                                                 </span>
                                                 ${token}
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

                        transporter.sendMail(mainOptions, function (err, info) {
                            if (err) {
                                console.log(err);
                                console.log(`can't send mail`);
                            } else {
                                console.log({ code: "200", 'Message sent: ': info.response })
                            }
                        });
                    }
                })
            }


        }
        else {
            const Order = await OrderService.newOrder(value);
            if (Order) {
                const idOrder = Order._id;
                await value.orderDetail.map(async (item) => {
                    const check = await ProductService.getById(item.idProduct);
                    if (check) {
                        const newValue = {
                            idProduct: item.idProduct,
                            idOrder,
                            idUser,
                            quantity: item.quantity,
                            price: item.price,
                        }
                        await OrderDetailService.newOrder(newValue)
                    }
                });
            }
        }


        return res.status(200).json({ code: "200", message: "sucsses" })

        // return res.status(200).json({code:"200",message:"sucsses"});

        // res.status(404).json({code:"404",message:"fail"});
    } catch (err) {
        console.log(err);
    }
}

module.exports.confirm = async (req, res, next) => {
    try {
        let { id } = req.body;
        const checkOrder = await OrderService.getOrderByID(id);
        if (checkOrder.cancel === false) {
            const value = {
                status: true
            }
            await OrderService.update(id, value);
            res.status(200).json({ code: "200", message: "xác nhận gửi thành công" });

        }
        res.json({ code: "404", message: "Không thể xác nhận đơn hàng đã hủy" });
    } catch (err) {
        console.log(err);
    }
}

module.exports.cancel = async (req, res, next) => {
    try {
        let { id } = req.body;
        const checkOrder = await OrderService.getOrderByID(id);
        if (checkOrder.status === false) {
            const value = {
                cancel: true
            }
            await OrderService.update(id, value);
            res.status(200).json({ code: "200", message: "Hủy đơn hàng thành công" });

        }
        res.json({ code: "404", message: "Đơn hàng đã được gửi không thể hủy" });
    } catch (err) {
        console.log(err);
    }
}

module.exports.verifyOrder = async (req, res, next) => {
    try {
        const { token } = req.body;
        const jwt = require('jsonwebtoken');
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
            if (err) {
                return res.status(401).json({ code: 401, message: "Qúa thời hạn xác thực" })
            } else {
                const value = {
                    cancel: false,
                    reason: ""
                }
                const UpdateOrder = await OrderService.update(decode.idOrder, value);
                if (UpdateOrder) {
                    return res.status(200).json({ code: 200, message: "Xác thực thành công" })
                }
                return res.status(401).json({ code: 401, message: "Xác thực thất bại" })
            }
        })
    } catch (err) {
        console.log(err);
    }
}



