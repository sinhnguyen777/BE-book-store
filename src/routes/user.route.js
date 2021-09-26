const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/user.controller');

router.delete('/del/:id', userController.delete);
router.put('/edit/:id', userController.update);
router.post('/create', userController.create);
router.get('/', userController.index);


module.exports = router;