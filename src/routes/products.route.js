const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/products.controller');



router.use('/', productsController.index);
router.post('/add', productsController.Create);


module.exports = router;