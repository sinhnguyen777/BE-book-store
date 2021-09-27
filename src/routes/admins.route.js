const express = require('express');
const router = express.Router();

const adminsController = require('../app/controllers/admins.controller');

router.delete('/del/:id', adminsController.delete);
router.put('/edit/:id', adminsController.update);
router.post('/create', adminsController.create);
router.get('/', adminsController.index);


module.exports = router;