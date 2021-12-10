const express = require('express');
const router = express.Router();
const middlewares = require('../app/middleware/authencation')

const commentController = require('../app/controllers/comment.controller');

router.delete('/del/:id',middlewares.checkAuthencation,middlewares.checkRoleDelCata,commentController.delete);
router.put('/edit', commentController.update);
router.post('/create', commentController.create);
router.get('/:id', commentController.getByIdCata);
router.get('/idProduct/:id', commentController.GetAllByIdProduct);


module.exports = router;