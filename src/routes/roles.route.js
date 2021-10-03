const express = require('express');
const router = express.Router();

const rolesController = require('../app/controllers/roles.controller');

router.delete('/del/:id', rolesController.delete);
router.put('/edit/:id', rolesController.update);
router.post('/create', rolesController.create);
router.get('/', rolesController.index);


module.exports = router;