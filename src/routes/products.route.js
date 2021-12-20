const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/products.controller');
const upload = require("../app/middleware/upload");
const { removeListener } = require('../app/models/products.model');
const middlewares = require('../app/middleware/authencation')

router.use('/selling', productsController.GetSelling);
router.get('/user-sell', productsController.GetAllUserSell);
router.get('/searchAuthor', productsController.SearchAuthor);
router.get('/searchName', productsController.SearchName);
router.get('/slug/:slug', productsController.detailBySlug);
router.get('/:id', productsController.GetProductById)
router.get('/idCata/:id', productsController.getByIdCata);
router.delete('/del/:id',middlewares.checkAuthencation,middlewares.checkRoleDelProduct, productsController.delete);
router.post('/create',middlewares.checkAuthencation,middlewares.checkRoleAddProduct, upload.array('images'), productsController.create);
router.put('/update',middlewares.checkAuthencation,middlewares.checkRoleUpdateProduct,upload.array('images'), productsController.update)
router.put('/update-dateDebut', productsController.updateDebut)
router.use('/', productsController.GetAll);

module.exports = router;