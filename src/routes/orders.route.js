const express = require('express');
const router = express.Router();

const ordersController = require('../app/controllers/orders.controller');

router.put('/cancle', ordersController.cancel);
router.post('/confirm', ordersController.confirm);
router.post('/create', ordersController.NewOrder);


module.exports = router;