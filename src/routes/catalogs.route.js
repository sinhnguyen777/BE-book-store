const express = require('express');
const router = express.Router();

const catalogsController = require('../app/controllers/catalogs.controller');

router.delete('/del/:id', catalogsController.delete);
router.put('/edit', catalogsController.update);
router.post('/create', catalogsController.create);
router.get('/', catalogsController.GetAll);


module.exports = router;