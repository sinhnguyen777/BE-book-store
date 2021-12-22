const express = require("express");
const router = express.Router();
const middlewares = require("../app/middleware/authencation");

const chaptersController = require("../app/controllers/chapter.controller");

router.delete(
  "/del/:id",
  middlewares.checkAuthencation,
  middlewares.checkRoleDelChapter,
  chaptersController.delete
);
router.put(
  "/edit",
  middlewares.checkAuthencation,
  middlewares.checkRoleUpdateChapter,
  chaptersController.update
);
router.post(
  "/create",
  middlewares.checkAuthencation,
  middlewares.checkRoleAddChapter,
  chaptersController.create
);
router.get("/idProduct/:id", chaptersController.getByIdProduct);
router.get("/", chaptersController.GetAll);
router.get("/:id", chaptersController.getById);

module.exports = router;
