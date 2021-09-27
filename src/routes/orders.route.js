const express = require('express');
const router = express.Router();

const ordersController = require('../app/controllers/orders.controller');

router.delete('/del/:id', ordersController.delete);
router.put('/edit/:id', ordersController.update);
router.post('/create', ordersController.create);
router.get('/', ordersController.index);


module.exports = router;