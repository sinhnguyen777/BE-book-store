const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/products.controller');
const upload = require("../app/middleware/upload")


router.get('/slug/:slug',productsController.detailBySlug);
router.get('/id/:id',productsController.detailById);
router.delete('/del/:id', productsController.delete);
router.post('/create',upload.array('images[]'),productsController.Create);
router.use('/', productsController.index);


module.exports = router;