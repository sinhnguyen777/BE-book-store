const express = require('express');
const router = express.Router();

const adminsController = require('../app/controllers/admins.controller');
const middlewares = require('../app/middleware/authencation')

router.delete('/del/:id',middlewares.checkAuthencation,middlewares.checkAdmin,adminsController.delete);
// router.put('/edit/:id', adminsController.update);
router.post('/register',middlewares.checkAuthencation,middlewares.checkAdmin, adminsController.Register);
router.post('/login', adminsController.Login);
// router.get('/', adminsController.index);


module.exports = router;