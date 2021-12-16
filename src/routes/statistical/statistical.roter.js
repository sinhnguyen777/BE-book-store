const express = require('express');
const router = express.Router();

const StatisticalOrderController = require('../../app/controllers/statistical/statistical.order.controller');

router.get('/order/', StatisticalOrderController.GetAll);
router.get('/order/by-date', StatisticalOrderController.GetAllByDate);

module.exports = router;