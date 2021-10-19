const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/products.controller');
const upload = require("../app/middleware/upload")


router.get('/slug/:slug',productsController.detailBySlug);
router.get('/idCata/:id',productsController.getByIdCata);
router.delete('/del/:id', productsController.delete);
router.post('/create',upload.array('images[]'),productsController.create);
router.use('/', productsController.GetAll);


module.exports = router;