const express = require('express');
const router = express.Router();
const middlewares = require('../app/middleware/authencation')

const wishlishController = require('../app/controllers/wishlish.controller');

router.delete('/del/',middlewares.checkAuthencation,wishlishController.delete);
router.post('/create',middlewares.checkAuthencation,wishlishController.create);
router.get('/', wishlishController.GetAll);

module.exports = router;