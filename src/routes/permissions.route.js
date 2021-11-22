const express = require('express');
const router = express.Router();

const permissionsController = require('../app/controllers/permissions.controller');

router.delete('/del/:id', permissionsController.delete);
router.put('/edit', permissionsController.update);
router.post('/create', permissionsController.create);
router.get('/', permissionsController.GetAll);
router.get('/:id', permissionsController.getById);


module.exports = router;