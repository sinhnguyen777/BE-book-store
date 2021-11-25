const express = require('express');
const router = express.Router();

const vipController = require('../app/controllers/vip.controller');

router.delete('/del/:id',vipController.delete);
router.put('/edit', vipController.update);
router.post('/create', vipController.create);
router.get('/:id', vipController.getByIdCata);
router.get('/', vipController.GetAll);


module.exports = router;