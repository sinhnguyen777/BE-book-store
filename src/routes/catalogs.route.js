const express = require('express');
const router = express.Router();

const catalogsController = require('../app/controllers/catalogs.controller');

router.delete('/:id', catalogsController.delete);
router.put('/:id', catalogsController.update);
router.post('/create', catalogsController.create);
router.get('/', catalogsController.index);


module.exports = router;