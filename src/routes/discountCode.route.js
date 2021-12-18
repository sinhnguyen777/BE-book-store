const express = require('express');
const router = express.Router();
const middlewares = require('../app/middleware/authencation')

const discountCodeController = require('../app/controllers/discountCode.controller');

router.post('/sendmail', discountCodeController.send);
router.delete('/del/:id',middlewares.checkAuthencation,middlewares.checkRoleDelDiscount,discountCodeController.delete);
router.put('/edit',middlewares.checkAuthencation,middlewares.checkRoleUpdateDiscount, discountCodeController.update);
router.post('/create',middlewares.checkAuthencation,middlewares.checkRoleAddDiscount, discountCodeController.create);
router.get('/:id', discountCodeController.getByIdDiscount);
router.get('/', discountCodeController.GetAll);


module.exports = router;