const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/products.controller');


router.delete('/del/:id', productsController.delete);
router.post('/create', productsController.Create);
router.use('/', productsController.index);


module.exports = router;