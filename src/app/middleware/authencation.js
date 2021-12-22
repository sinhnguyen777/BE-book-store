const jwt = require("jsonwebtoken");
const RoleService = require("../services/role.service");

module.exports.checkAuthencation = function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    // const token = authorizationHeader.split(' ')[1];
    // console.log(token);
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (check) {
        next();
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

module.exports.checkAdmin = function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (check) {
        if (check.idRole == "616e9df24610dc3e93caa27f") {
          next();
        } else {
          return res.send("fail");
        }
      } else {
        return res.send("fail");
      }
    } else {
      return res.send("not token");
    }
  } catch (err) {
    return res.json({ status: 405, message: "Token verify failed" });
    // return res.redirect('/users/login')
  }
};

module.exports.checkRoleDelCata = async function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const checkRole = await RoleService.getPermission(check.idRole);
      const getPermission = checkRole.listPermissions.filter(
        (item) => item.idPermissions == "617569371dc6751ed1cfb13d"
      );
      console.log(getPermission[0].status);
      if (getPermission[0].status) {
        return next();
      }
      return res.json({ status: 403, message: "not authorization" });
    } else {
      return res.send("not token");
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: 405, message: "Token verify failed" });
    // return res.redirect('/users/login')
  }
};
// đổi tên export

module.exports.checkRoleAddCata = async function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const checkRole = await RoleService.getPermission(check.idRole);
      // đổi id
      const getPermission = checkRole.listPermissions.filter(
        (item) => item.idPermissions == "617569321dc6751ed1cfb132"
      );
      console.log(getPermission[0].status);
      if (getPermission[0].status) {
        return next();
      }
      return res.json({ status: 403, message: "not authorization" });
    } else {
      return res.send("not token");
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: 405, message: "Token verify failed" });
    // return res.redirect('/users/login')
  }
};
module.exports.checkRoleAddCata = async function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const checkRole = await RoleService.getPermission(check.idRole);
      // đổi id
      const getPermission = checkRole.listPermissions.filter(
        (item) => item.idPermissions == "617569321dc6751ed1cfb132"
      );
      if (getPermission[0].status) {
        return next();
      }
      return res.json({ status: 403, message: "not authorization" });
    } else {
      return res.send("not token");
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: 405, message: "Token verify failed" });
    // return res.redirect('/users/login')
  }
};

module.exports.checkRoleUpdateCata = async function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const checkRole = await RoleService.getPermission(check.idRole);
      // đổi id
      const getPermission = checkRole.listPermissions.filter(
        (item) => item.idPermissions == "6175693c1dc6751ed1cfb150"
      );
      console.log(getPermission[0].status);
      if (getPermission[0].status) {
        return next();
      }
      return res.json({ status: 403, message: "not authorization" });
    } else {
      return res.send("not token");
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: 405, message: "Token verify failed" });
    // return res.redirect('/users/login')
  }
};
module.exports.checkRoleUpdateProduct = async function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const checkRole = await RoleService.getPermission(check.idRole);
      // đổi id
      const getPermission = checkRole.listPermissions.filter(
        (item) => item.idPermissions == "617569431dc6751ed1cfb16b"
      );
      console.log(getPermission[0].status);
      if (getPermission[0].status) {
        return next();
      }
      return res.json({ status: 403, message: "not authorization" });
    } else {
      return res.send("not token");
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: 405, message: "Token verify failed" });
    // return res.redirect('/users/login')
  }
};
module.exports.checkRoleAddProduct = async function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const checkRole = await RoleService.getPermission(check.idRole);
      // đổi id
      const getPermission = checkRole.listPermissions.filter(
        (item) => item.idPermissions == "617569471dc6751ed1cfb18e"
      );
      console.log(getPermission[0].status);
      if (getPermission[0].status) {
        return next();
      }
      return res.json({ status: 403, message: "not authorization" });
    } else {
      return res.send("not token");
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: 405, message: "Token verify failed" });
    // return res.redirect('/users/login')
  }
};
module.exports.checkRoleDelProduct = async function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const checkRole = await RoleService.getPermission(check.idRole);
      // đổi id
      const getPermission = checkRole.listPermissions.filter(
        (item) => item.idPermissions == "6175694b1dc6751ed1cfb1b9"
      );
      console.log(getPermission[0].status);
      if (getPermission[0].status) {
        return next();
      }
      return res.json({ status: 403, message: "not authorization" });
    } else {
      return res.send("not token");
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: 405, message: "Token verify failed" });
    // return res.redirect('/users/login')
  }
};
module.exports.checkRoleDelDiscount = async function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const checkRole = await RoleService.getPermission(check.idRole);
      // đổi id
      const getPermission = checkRole.listPermissions.filter(
        (item) => item.idPermissions == "61756a471dc6751ed1cfb2e5"
      );
      console.log(getPermission[0].status);
      if (getPermission[0].status) {
        return next();
      }
      return res.json({ status: 403, message: "not authorization" });
    } else {
      return res.send("not token");
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: 405, message: "Token verify failed" });
    // return res.redirect('/users/login')
  }
};
module.exports.checkRoleAddDiscount = async function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const checkRole = await RoleService.getPermission(check.idRole);
      // đổi id
      const getPermission = checkRole.listPermissions.filter(
        (item) => item.idPermissions == "61756a421dc6751ed1cfb2a2"
      );
      console.log(getPermission[0].status);
      if (getPermission[0].status) {
        return next();
      }
      return res.json({ status: 403, message: "not authorization" });
    } else {
      return res.send("not token");
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: 405, message: "Token verify failed" });
    // return res.redirect('/users/login')
  }
};
module.exports.checkRoleUpdateDiscount = async function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const checkRole = await RoleService.getPermission(check.idRole);
      // đổi id
      const getPermission = checkRole.listPermissions.filter(
        (item) => item.idPermissions == "61756a6f1dc6751ed1cfb331"
      );
      console.log(getPermission[0].status);
      if (getPermission[0].status) {
        return next();
      }
      return res.json({ status: 403, message: "not authorization" });
    } else {
      return res.send("not token");
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: 405, message: "Token verify failed" });
    // return res.redirect('/users/login')
  }
};
module.exports.checkRoleConfirmOrder = async function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const checkRole = await RoleService.getPermission(check.idRole);
      // đổi id
      const getPermission = checkRole.listPermissions.filter(
        (item) => item.idPermissions == "61756d9c1dc6751ed1cfb480"
      );
      console.log(getPermission[0].status);
      if (getPermission[0].status) {
        return next();
      }
      return res.json({ status: 403, message: "not authorization" });
    } else {
      return res.send("not token");
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: 405, message: "Token verify failed" });
    // return res.redirect('/users/login')
  }
};
module.exports.checkRoleUpdateChapter = async function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const checkRole = await RoleService.getPermission(check.idRole);
      // đổi id
      const getPermission = checkRole.listPermissions.filter(
        (item) => item.idPermissions == "61c20eed15b6ec8e20c3ac3d"
      );
      console.log(getPermission[0].status);
      if (getPermission[0].status) {
        return next();
      }
      return res.json({ status: 403, message: "not authorization" });
    } else {
      return res.send("not token");
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: 405, message: "Token verify failed" });
    // return res.redirect('/users/login')
  }
};
module.exports.checkRoleAddChapter = async function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const checkRole = await RoleService.getPermission(check.idRole);
      // đổi id
      const getPermission = checkRole.listPermissions.filter(
        (item) => item.idPermissions == "61c20ee115b6ec8e20c3ac0a"
      );
      console.log(getPermission[0].status);
      if (getPermission[0].status) {
        return next();
      }
      return res.json({ status: 403, message: "not authorization" });
    } else {
      return res.send("not token");
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: 405, message: "Token verify failed" });
    // return res.redirect('/users/login')
  }
};
module.exports.checkRoleDelChapter = async function (req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (token) {
      const check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const checkRole = await RoleService.getPermission(check.idRole);
      // đổi id
      const getPermission = checkRole.listPermissions.filter(
        (item) => item.idPermissions == "61c20ef215b6ec8e20c3ac74"
      );
      console.log(getPermission[0].status);
      if (getPermission[0].status) {
        return next();
      }
      return res.json({ status: 403, message: "not authorization" });
    } else {
      return res.send("not token");
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: 405, message: "Token verify failed" });
    // return res.redirect('/users/login')
  }
};
