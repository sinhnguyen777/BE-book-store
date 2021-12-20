const CatalogService = require("../services/catalogs.service");

module.exports.GetAll = async (req, res, next) => {
  try {
    const Catalogs = await CatalogService.getAll();

    return res
      .status(200)
      .json({ code: "200", message: "sucsses", data: Catalogs });

    // res.status(404).json({code:"404",message:"fail"});
  } catch (err) {
    console.log(err);
  }
};

module.exports.getByIdCata = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Catalogs = await CatalogService.getById(id);
    if (!Catalogs) {
      return res
        .status(404)
        .json({ code: "404", message: "Catalog not found" });
    }
    return res
      .status(200)
      .json({ code: "200", message: "sucsses", data: Catalogs });
    // res.status(404).json({code:"404",message:"fail"});
  } catch (err) {
    console.log(err);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    let value = req.body;
    const filter = {
      nameCata: value.nameCata,
    };
    const checkNameCata = await CatalogService.getAll(filter);
    if (checkNameCata.length > 0) {
      return res.json({ code: 404, message: "Tên Danh Mục Đã Tồn Tại" });
    }
    await CatalogService.createNew(value);
    return res.status(200).json({ code: "200", message: "sucsses" });
  } catch (err) {
    console.log(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const DelCata = await CatalogService.delete(id);
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
    const checkId = await CatalogService.getById(id);
    if (!checkId) {
      return res
        .status(404)
        .json({ code: "404", message: "Catalogs not found" });
    }
    const UpdateCata = await CatalogService.update(id, value);
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
