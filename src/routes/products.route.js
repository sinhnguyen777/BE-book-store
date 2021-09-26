const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/products.controller');
const upload = require("../app/middleware/upload")



router.post('/create',upload.single('avatar'),productsController.Create);
router.use('/', productsController.index);



module.exports = router;