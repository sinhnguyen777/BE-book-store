const express = require('express');
const router = express.Router();

const orderCancelsController = require('../app/controllers/orderCancels.controller');

router.delete('/del/:id', orderCancelsController.delete);
router.put('/edit/:id', orderCancelsController.update);
router.post('/create', orderCancelsController.create);
router.get('/', orderCancelsController.index);


module.exports = router;