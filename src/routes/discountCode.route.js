const express = require('express');
const router = express.Router();
const middlewares = require('../app/middleware/authencation')

const discountCodeController = require('../app/controllers/discountCode.controller');

router.delete('/del/:id',middlewares.checkAuthencation,discountCodeController.delete);
router.put('/edit', discountCodeController.update);
router.post('/create', discountCodeController.create);
router.get('/:id', discountCodeController.getByIdDiscount);
router.get('/', discountCodeController.GetAll);


module.exports = router;