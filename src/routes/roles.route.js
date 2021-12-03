const express = require('express');
const router = express.Router();
const middlewares = require('../app/middleware/authencation')

const rolesController = require('../app/controllers/roles.controller');

router.delete('/del/:id',middlewares.checkAuthencation,middlewares.checkRoleDelCata, rolesController.delete);
router.put('/edit', rolesController.update);
router.post('/create', rolesController.create);
router.get('/', rolesController.GetAll);


module.exports = router;