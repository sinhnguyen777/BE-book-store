const express = require('express');
const router = express.Router();

const catalogsController = require('../app/controllers/catalogs.controller');


router.use('/', catalogsController.index);


module.exports = router;