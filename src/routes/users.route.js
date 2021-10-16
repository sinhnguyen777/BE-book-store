const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/users.controller');

router.delete('/del/:id', usersController.delete);
router.put('/edit/:id', usersController.update);
router.post('/create', usersController.create);
router.get('/', usersController.index);


module.exports = router;