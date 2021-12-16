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

module.exports.GetById = async (req, res, next) => {
    try {
        const id  = req.params.id;
        console.log(id)
        const Order = await OrderService.getById(id);
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
                            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" />
                            <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                              <head> </head>
                              <head>
                                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                <meta name="x-apple-disable-message-reformatting" />
                                <!--[if !mso]><!-->
                                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                                <!--<![endif]-->
                                <style type="text/css">
                                  * {
                                    text-size-adjust: 100%;
                                    -ms-text-size-adjust: 100%;
                                    -moz-text-size-adjust: 100%;
                                    -webkit-text-size-adjust: 100%;
                                  }
                            
                                  html {
                                    height: 100%;
                                    width: 100%;
                                  }
                            
                                  body {
                                    height: 100% !important;
                                    margin: 0 !important;
                                    padding: 0 !important;
                                    width: 100% !important;
                                    mso-line-height-rule: exactly;
                                  }
                            
                                  div[style*="margin: 16px 0"] {
                                    margin: 0 !important;
                                  }
                            
                                  table,
                                  td {
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  }
                            
                                  img {
                                    border: 0;
                                    height: auto;
                                    line-height: 100%;
                                    outline: none;
                                    text-decoration: none;
                                    -ms-interpolation-mode: bicubic;
                                  }
                            
                                  .ReadMsgBody,
                                  .ExternalClass {
                                    width: 100%;
                                  }
                            
                                  .ExternalClass,
                                  .ExternalClass p,
                                  .ExternalClass span,
                                  .ExternalClass td,
                                  .ExternalClass div {
                                    line-height: 100%;
                                  }
                                </style>
                                <!--[if gte mso 9]>
                                  <style type="text/css">
                                  li { text-indent: -1em; }
                                  table td { border-collapse: collapse; }
                                  </style>
                                  <![endif]-->
                                <title>Welcome to HEML!</title>
                                <!-- content -->
                                <!--[if gte mso 9]><xml>
                                   <o:OfficeDocumentSettings>
                                    <o:AllowPNG/>
                                    <o:PixelsPerInch>96</o:PixelsPerInch>
                                   </o:OfficeDocumentSettings>
                                  </xml><![endif]-->
                              </head>
                              <body class="body" style="margin: 0; width: 100%;">
                                <table class="bodyTable" role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; margin: 0;">
                                  <tr>
                                    <td class="body__content" align="center" width="100%" valign="top" style="color: #000000; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; text-align: center;">
                                      <div class="container" style="margin: 0 auto; max-width: 600px; width: 100%;"> <!--[if mso | IE]>
                                        <table class="container__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-right: auto; margin-left: auto;width: 600px" width="600" align="center">
                                          <tr>
                                            <td> <![endif]-->
                                              <table class="container__table" role="presentation" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                                                <tr class="container__row">
                                                  <td class="container__cell" width="100%" align="left" valign="top">
                                                    <p class="logo text p" style="margin: 14px 0; color: #000000; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; text-align: center; justify-content: center; align-items: center; display: flex;"> <img src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/08/logo.png" border="0" alt="" class="img__block" style="display: block; max-width: 100%;" />
                                                      <h1 class="header h1" style="margin: 20px 0; line-height: 40px; font-family: Helvetica,Arial,sans-serif; text-align: center; color: #FF0000;">ChapterOne</h1>
                                                    </p>
                                                    <div class="confirm" style="align-items: center; border: 1px solid; display: flex; font-family: 'Montserrat',sans-serif; justify-content: center; position: relative;">
                                                      <div class="error-container" style="color: #343434; padding: 40px; text-align: center; width: 90%;">
                                                        <p class="thanks text p" style="display: block; margin: 14px 0; font-family: Helvetica,Arial,sans-serif; line-height: 20px; text-align: center; color: #0F1568; font-size: 19px;">Cám ơn bạn đã đặt hàng tại <strong>ChapterOne</strong></p>
                                                        <p class="hello text p" style="display: block; margin: 14px 0; color: #000000; font-family: Helvetica,Arial,sans-serif; line-height: 20px; font-size: 19px; text-align: left;">Xin chào</p>
                                                        <p class="content text p" style="display: block; margin: 14px 0; color: #000000; font-family: Helvetica,Arial,sans-serif; line-height: 20px; font-size: 15px; text-align: left;"> Chúng tôi đã nhận được yêu cầu đặt hàng của bạn và đang xử lý nhé.Đơn hàng của bạn sẽ được giao trong thời gian gần nhất.<br/> <br/> Vui lòng xác nhận đơn hàng của bạn!! </p>
                                                        <p class="xacnhan text p" style="display: block; margin: 14px 0; color: #000000; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; text-align: center; padding-top: 20px;">
                                                        <a class="btn a" to="/" href=${`http://localhost:3000/side/order/confirm/${token}`} style="transition: all .5s; padding: 10px 20px; margin: 20px 0; border-radius: 5px; background-color: #000000; color: #FFFFFF; text-decoration: none;"><span class="a__text" style="color: #FFFFFF; text-decoration: none;">Xác nhận</span></a>                              </p> <em class="note" style="color: #FF0000; font-size: 14px; font-weight: 700; margin: 10px 0; text-align: left;">* Đơn hàng của bạn sẽ bị hủy nếu như không xác nhận trong vòng 24h kể từ khi mail này được gửi</em> </div>
                                                    </div>
                                                  </td>
                                                </tr>
                                              </table> <!--[if mso | IE]> </td>
                                          </tr>
                                        </table> <![endif]--> </div>
                                    </td>
                                  </tr>
                                </table>
                                <div style="display:none; white-space:nowrap; font-size:15px; line-height:0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
                              </body>
                            </html>
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
                    return res.status(200).json({ code: 200, message: "Xác thực thành công",id:decode.idOrder })
                }
                return res.status(401).json({ code: 401, message: "Xác thực thất bại" })
            }
        })
    } catch (err) {
        console.log(err);
    }
}



