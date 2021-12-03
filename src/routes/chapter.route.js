const express = require('express');
const router = express.Router();
const middlewares = require('../app/middleware/authencation')

const chaptersController = require('../app/controllers/chapter.controller');

router.delete('/del/:id',middlewares.checkAuthencation,middlewares.checkRoleDelCata,chaptersController.delete);
router.put('/edit', chaptersController.update);
router.post('/create', chaptersController.create);
router.get('/idProduct/:id',chaptersController.getByIdProduct);
router.get('/', chaptersController.GetAll);
router.get('/:id', chaptersController.getById);


module.exports = router;