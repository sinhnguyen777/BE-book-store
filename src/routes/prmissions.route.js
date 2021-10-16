const express = require('express');
const router = express.Router();

const prmissionsController = require('../app/controllers/prmissions.controller');

router.delete('/del/:id', prmissionsController.delete);
router.put('/edit/:id', prmissionsController.update);
router.post('/create', prmissionsController.create);
router.get('/', prmissionsController.index);


module.exports = router;