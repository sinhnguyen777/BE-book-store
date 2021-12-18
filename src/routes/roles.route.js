const express = require('express');
const router = express.Router();
const middlewares = require('../app/middleware/authencation')

const rolesController = require('../app/controllers/roles.controller');

router.delete('/del/:id' ,middlewares.checkAuthencation,middlewares.checkAdmin, rolesController.delete);
router.put('/edit', middlewares.checkAuthencation,middlewares.checkAdmin, rolesController.update);
router.post('/create', middlewares.checkAuthencation,middlewares.checkAdmin, rolesController.create);
router.get('/', rolesController.GetAll);


module.exports = router;