const express = require('express');
const router = express.Router();
const middlewares = require('../app/middleware/authencation')

const catalogsController = require('../app/controllers/catalogs.controller');

router.delete('/del/:id',middlewares.checkAuthencation, catalogsController.delete);
router.put('/edit', catalogsController.update);
router.post('/create', catalogsController.create);
router.get('/', catalogsController.GetAll);


module.exports = router;