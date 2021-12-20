const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/users.controller');
const upload = require("../app/middleware/upload");


// router.delete('/del/:id', usersController.delete);
// router.put('/edit/:id', usersController.update);
router.post('/login', usersController.Login);
router.post('/register', usersController.Register);
router.post('/verify-email', usersController.VerifyEmail);
router.get('/:id', usersController.getUserById);
router.get('/', usersController.getAll);
router.post('/edit', usersController.changeInfor);
router.post('/access-token', usersController.AccessToken);
router.post('/upload-avt',upload.single('avatar'),(req,res,next)=>{
    console.log(req.file);
    res.send(req.file)
});



module.exports = router;