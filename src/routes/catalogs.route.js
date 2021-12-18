const express = require("express");
const router = express.Router();
const middlewares = require("../app/middleware/authencation");

const catalogsController = require("../app/controllers/catalogs.controller");

router.delete(
  "/del/:id",
  middlewares.checkAuthencation,
  middlewares.checkRoleDelCata,
  catalogsController.delete
);
router.put(
  "/edit",
  middlewares.checkAuthencation,
  middlewares.checkRoleUpdateCata,
  catalogsController.update
);
router.post(
  "/create",
  middlewares.checkAuthencation,
  middlewares.checkRoleAddCata,
  catalogsController.create
);
router.get("/", catalogsController.GetAll);
router.get("/:id", catalogsController.getByIdCata);

module.exports = router;
