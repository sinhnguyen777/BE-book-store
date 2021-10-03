const express = require('express');
const router = express.Router();

const feedbackController = require('../app/controllers/feedback.controller');

router.delete('/del/:id', feedbackController.delete);
router.put('/edit/:id', feedbackController.update);
router.post('/create', feedbackController.create);
router.get('/', feedbackController.index);


module.exports = router;