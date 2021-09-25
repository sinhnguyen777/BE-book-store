const express = require('express');
const router = express.Router();

const catalogsController = require('../app/controllers/catalogs.controller');


router.get('/', catalogsController.index);


module.exports = router;