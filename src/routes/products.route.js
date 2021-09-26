const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/products.controller');



router.post('/add', productsController.Create);
router.use('/', productsController.index);



module.exports = router;