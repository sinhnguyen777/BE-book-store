const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/products.controller');
const upload = require("../app/middleware/upload")



router.post('/create',upload.array('images[]'),productsController.Create);
router.use('/', productsController.index);



module.exports = router;