const express = require('express');
const router = express.Router();

const orderDetailsController = require('../app/controllers/orderDetails.controller');

router.post('/create', orderDetailsController.NewOrderDetail);


module.exports = router;