const express = require('express');
const router = express.Router();

const discountCodeController = require('../app/controllers/discountCode.controller');

router.delete('/del/:id', discountCodeController.delete);
router.put('/edit/:id', discountCodeController.update);
router.post('/create', discountCodeController.create);
router.get('/', discountCodeController.index);


module.exports = router;