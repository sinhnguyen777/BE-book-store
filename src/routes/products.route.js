const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/products.controller');
const upload = require("../app/middleware/upload");
const { removeListener } = require('../app/models/products.model');
const middlewares = require('../app/middleware/authencation')

router.use('/selling', productsController.GetSelling);
router.get('/searchAuthor', productsController.SearchAuthor);
router.get('/searchName', productsController.SearchName);
router.get('/slug/:slug', productsController.detailBySlug);
router.get('/:id', productsController.GetProductById)
router.get('/idCata/:id', productsController.getByIdCata);
router.delete('/del/:id', productsController.delete);
router.post('/create', upload.array('images'), productsController.create);
router.put('/update',upload.array('images'), productsController.update)
router.use('/', productsController.GetAll);

module.exports = router;