const express = require('express');
const router = express.Router();

const catalogsController = require('../app/controllers/catalogs.controller');


router.get('/', catalogsController.index);
router.post('/add', catalogsController.Create);


module.exports = router;