const express = require('express');
const router = express.Router();

const orderDetailsController = require('../app/controllers/orderDetails.controller');

router.post('/create', orderDetailsController.NewOrderDetail);
router.get('/:id', orderDetailsController.GetId);


module.exports = router;