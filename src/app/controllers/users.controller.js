const UserService = require("../services/user.service");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

exports.getAll = async (req, res, next) => {
  try {
    const ListUser = await UserService.getAll();
    return res
      .status(200)
      .json({ code: "200", message: "sucsses", data: ListUser });
  } catch (err) {
    res.send(err);
    // console.log(err);
  }
};

exports.AccessToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (check.email) {
        res
          .status(200)
          .json({ status: 200, message: "token access", data: check });
      } else {
        return res.status(401).json({ status: 401, message: "token expired" });
      }
    } else {
      return res.status(401).json({ status: 401, message: "token expired" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(405)
      .json({ status: 405, message: "Token verify failed" });
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const ListUser = await UserService.getById(id);
    return res
      .status(200)
      .json({ code: "200", message: "sucsses", data: ListUser });
  } catch (err) {
    res.send(err);
    // console.log(err);
  }
};

exports.changeInfor = async (req, res, next) => {
  try {
    const { id } = req.body;
    const values = req.body;
    console.log(values)
    await UserService.update(id, values);
    return res.status(200).json({ code: "200", message: "sucsses", data: values });
  } catch (err) {
    res.send(err);
    // console.log(err);
  }
};

exports.Register = async (req, res, next) => {
  try {
    const values = req.body;
    const user = await UserService.getByEmail(values.email);
    if (user.length > 0) {
      return res.json({ message: "Tài khoản đã tồn tại!!" });
    }

    //Send Mail Xác thực
    const nodemailer = require("nodemailer");
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      values,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" },
      (err, token) => {
        if (err) {
          return res.json("Token sign failed");
        } else {
          var transporter = nodemailer.createTransport({
            // config mail server
            service: "gmail",
            auth: {
              user: "chapterone.bookstoreteam@gmail.com",
              pass: "bookstore",
            },
            tls: { rejectUnauthorized: false },
          });

          var mainOptions = {
            from: "chapterone.bookstoreteam@gmail.com",
            to: values.email,
            subject: `Kính gửi Ông/Bà ${values.fullName}.`,
            text: `Xác nhận Đăng ký Tài khoản`,
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
                                        <p class="thanks text p" style="display: block; margin: 14px 0; font-family: Helvetica,Arial,sans-serif; line-height: 20px; text-align: center; color: #0F1568; font-size: 19px;">Chào mừng ${values.fullName} đã đến với thế giới của <strong>ChapterOne</strong></p>
                                        <p class="content text p" style="display: block; margin: 14px 0; color: #000000; font-family: Helvetica,Arial,sans-serif; line-height: 20px; font-size: 15px; text-align: left;">
                                        Đừng quên <strong>Xác thực tài khoản</strong> bằng cách bấm vào nút bên dưới để bắt đầu các trải nghiệm thú vị của chúng tôi! </p>
                                        <p class="xacnhan text p" style="display: block; margin: 14px 0; color: #000000; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px; text-align: center; padding-top: 20px;">
                                        <a class="btn a" to="/" href=${`http://localhost:3000/side/confirm/${token}`} style="transition: all .5s; padding: 10px 20px; margin: 20px 0; border-radius: 5px; background-color: #000000; color: #FFFFFF; text-decoration: none;"><span class="a__text" style="color: #FFFFFF; text-decoration: none;">Xác thực</span></a>                              </p>
                                      </div>
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
            </html>`,
          };

          transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
              console.log(err);
              return res.status(404).json(`can't send mail`);
            } else {
              return res
                .status(200)
                .json({ code: "200", "Message sent: ": info.response });
            }
          });
        }
      }
    );
  } catch (err) {
    res.send(err);
    // console.log(err);
  }
};

exports.VerifyEmail = async (req, res, next) => {
  try {
    const token = req.body.token;
    const jwt = require("jsonwebtoken");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
      if (err) res.sendStatus(403);
      const today = new Date();
      data.vip = today;
      data.avatar = `uploads/img_avatar.png`;
      const filter = {
        email: data.email
      }
      const checkUser = await UserService.getAll(filter);
      if (checkUser.length > 0) {
        return res.json({ code: "404", message: "Tài Khoản Đã Được Xác Thực" });
      }
      const addUser = await UserService.createNew(data);
      if (addUser) {
        return res
          .status(200)
          .json({ code: "200", message: "Add user success!", data: data });
      }
      return res.status(404).json({ code: "404", message: "Add user fail!" });
    });
  } catch (err) {
    res.send(err);
  }
};

exports.Login = async (req, res, next) => {
  try {
    let values = req.body;
    const user = await UserService.Login(values);
    if (user) {
      const jwt = require("jsonwebtoken");
      let token = jwt.sign(
        { email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30m",
        },
        (err, token) => {
          if (err) {
            console.log("Token sign failed");
          } else {
            res.json({ data: [user], token: token });
          }
        }
      );
    } else {
      return res.status(404).json({ code: "404", message: "Login fail!" });
    }
  } catch (error) {
    // console.log(error);
    res.send(err);
  }
};


exports.LoginGG = async (req, res, next) => {
  try {
    const jwt = require("jsonwebtoken");
    let values = req.body;
    const filter = {
      email: values.email
    }
    const checkUser = await UserService.getAll(filter);

    if (!checkUser[0]) {
      const today = new Date();
      const data = {
        fullName: values.fullName,
        password: '12345678',
        email: values.email,
        vip: today,
        avatar: `uploads/img_avatar.png`
      }
      const addUser = await UserService.createNew(data);
      if(addUser){
        const token = jwt.sign(
          { email: checkUser[0].email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1d",
          },
          (err, token) => {
            if (err) {
              console.log("Token sign failed");
            } else {
              return res.json({ data: [checkUser[0]], token: token });
            }
          }
        );
      }
      return res.json({ code: 404 , message:"Đăng ký Thất Bại" });
    } else {
      const token = jwt.sign(
        { email: checkUser[0].email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        },
        (err, token) => {
          if (err) {
            console.log("Token sign failed");
          } else {
            return res.json({ data: [checkUser[0]], token: token });
          }
        }
      );
    }
  } catch (error) {
    // console.log(error);
    res.status(404).json({code:404 , message:"err"});
  }
};
