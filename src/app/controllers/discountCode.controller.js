const DiscountCodeService = require("../services/discountCode.service");
const UserService = require("../services/user.service");

module.exports.GetAll = async (req, res, next) => {
  try {
    const filter = req.query;
    const Catalogs = await DiscountCodeService.getAll(filter);

    return res
      .status(200)
      .json({ code: "200", message: "sucsses", data: Catalogs });

    // res.status(404).json({code:"404",message:"fail"});
  } catch (err) {
    console.log(err);
  }
};

module.exports.checkCoupon = async (req, res, next) => {
  try {
    const filter = {
      code : req.body.code,
    }
    const Catalogs = await DiscountCodeService.getAll(filter);
    if(Catalogs[0]){
      return res
      .status(200)
      .json({ code: "200", message: "sucsses", data: Catalogs });
    }else{
      return res
      .status(404)
      .json({ code: "404", message: "code not found"});

    }
    
    // res.status(404).json({code:"404",message:"fail"});
  } catch (err) {
    console.log(err);
  }
};

module.exports.getByIdDiscount = async (req, res, next) => {
  try {
    const id = req.params.id;
    const DiscountCode = await DiscountCodeService.getById(id);
    if (!DiscountCode) {
      return res
        .status(404)
        .json({ code: "404", message: "Catalog not found" });
    }
    return res
      .status(200)
      .json({ code: "200", message: "sucsses", data: DiscountCode });
    // res.status(404).json({code:"404",message:"fail"});
  } catch (err) {
    console.log(err);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    let value = req.body;
     const filter = {
      code: value.code,
    };
    const checkNameCata = await DiscountCodeService.getAll(filter);
    if (checkNameCata.length > 0) {
      return res.json({ code: 404, message: "Mã giảm giá Đã Tồn Tại" });
    }
    await DiscountCodeService.createNew(value);
    res.status(200).json({ code: "200", message: "sucsses" });
  } catch (err) {
    console.log(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const DelCata = await DiscountCodeService.delete(id);
    if (!DelCata) {
      res.json({ code: "404", message: "Catalogs not foud" });
    }
    res.json({ code: "200", message: "sucsses" });
    // res.status(200).json({code:"200",message:"sucsses"});
  } catch (err) {
    console.log(err);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const { id } = req.body;
    const value = req.body;
    const checkId = await DiscountCodeService.getById(id);
    if (!checkId) {
      return res
        .status(404)
        .json({ code: "404", message: "Catalogs not found" });
    }
    const UpdateCata = await DiscountCodeService.update(id, value);
    if (!UpdateCata) {
      return res
        .status(404)
        .json({ code: "404", message: "Catalogs not found" });
    }
    res.json({ code: "200", message: "sucsses" });
  } catch (err) {
    console.log(err);
  }
};
module.exports.send = async (req, res, next) => {
  try {
    const value = req.body;
    const idUser = value.idUser;
    const checkIdUser = await UserService.getById(idUser);
    if (checkIdUser) {
      const Coupon = await DiscountCodeService.getById(value.idCoupon);
      if (Coupon.status) {
        return res.json({
          code: "404",
          message: "Coupon đã được gửi đi trước đó",
        });
      }

      if (Coupon) {
        const nodemailer = require("nodemailer");
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
          to: checkIdUser.email,
          subject: `Kính gửi Ông/Bà ${checkIdUser.fullName}.`,
          text: `Xác nhận`,
          html: `<heml>
          <head>
            <subject>Welcome to HEML!</subject>
            <style>
              body{
                text-align:center;
              }
              .logo{
                  display:flex;
                  justify-content: center;
                  align-items: center;
              }
              .logo h1{
                color: red;
              }
              .confirm{
                  position: relative;
                  font-family: "Montserrat", sans-serif;
                  border: 1px solid;
                  display:flex;
                  justify-content: center;
                  align-items: center;
              }
              .error-container{
                width:90%;
                text-align: center;
                color: #343434;
                padding: 40px;
              }
              .error-container .thanks{
                font-size: 19px;
                color: #0f1568;
              }
              .error-container .hello{
                font-size: 19px;
                text-align: left;
              }
              .error-container .content{
                font-size: 15px;
                text-align: left;
              }
              .error-container .xacnhan{
                color: #fff;
                letter-spacing: 3px;
                display:flex;
                justify-content: center;
                align-items: center;
              }
              .error-container .xacnhan strong{
                width: 200px;
                margin-top: 20px;
                padding: 15px
                background: #0f1568;
              }
              .btn {
                margin-top: 20px;
                text-decoration:none;
                padding:10px 20px;
                background:#000;
                color:#fff;
                margin:20px 0;
                border-radius:5px;
                transition: all .5s;
              }
            </style>
          </head>
          <body>
            <container>
              <p class="logo">
                <img src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/08/logo.png"/>
                <h1>ChapterOne</h1>
              </p>
              <div class="confirm">
                <div class="error-container">
                  <p class="thanks">Cám ơn bạn đã đồng hành cùng <strong>ChapterOne</strong></p>
                  <p class="hello">Xin chào</p>
                  <p class="content">
                    Bạn là một trong những khách hàng thuộc top trong tháng qua<br></br> Chúng tôi xin gửi tặng bạn mã giảm giá!!
                  </p>
                  <p class="xacnhan">
                    <strong>${Coupon.code}</strong>
                  </p>
                  <p class="text p" style="display: block; margin: 14px 0; color: #000000; font-family: Helvetica,Arial,sans-serif; font-size: 16px; line-height: 20px;">
                            <strong>Mã giảm giá chỉ được xài 1 lần</strong> </p>
              </div>
            </div>
            </container>
          </body>
        </heml>
              `,
        };

        transporter.sendMail(mainOptions, async function (err, info) {
          if (err) {
            console.log(err);
            console.log(`can't send mail`);
          } else {
            const data = {
              status: true,
            };
            await DiscountCodeService.update(Coupon._id, data);

            return res
              .status(200)
              .json({ code: "200", "Message sent: ": info.response });
          }
        });
      }
    }
    // const SendCoupon = await DiscountCodeService.delete(idUser,value);
    // if(!SendCoupon){
    //     res.json({code:"404",message:"Sản Phẩm Không Tồn Tại"})
    // }
    // res.json({code:"200",message:"sucsses"})
    // res.status(200).json({code:"200",message:"sucsses"});
  } catch (err) {
    console.log(err);
  }
};
