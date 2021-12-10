const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/users.controller');

// router.delete('/del/:id', usersController.delete);
// router.put('/edit/:id', usersController.update);
router.post('/login', usersController.Login);
router.post('/register', usersController.Register);
router.post('/verify-email', usersController.VerifyEmail);
router.get('/:id', usersController.getUserById);
router.get('/', usersController.getAll);


module.exports = router;