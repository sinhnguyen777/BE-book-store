const express = require('express');
const router = express.Router();

const ordersController = require('../app/controllers/orders.controller');

router.put('/cancle', ordersController.cancel);
router.put('/confirm', ordersController.confirm);
router.post('/create', ordersController.NewOrder);
router.post('/verify-order', ordersController.verifyOrder);

module.exports = router;