const express = require('express');
const router = express.Router();

const catalogsController = require('../app/controllers/catalogs.controller');

router.delete('/del/:id', catalogsController.delete);
router.put('/edit/:id', catalogsController.update);
router.post('/create', catalogsController.create);
router.get('/', catalogsController.index);


module.exports = router;