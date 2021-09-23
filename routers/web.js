import express from 'express';
import {isAuth} from '../helpers/jwtHelper.js';
import {
    userMB,
} from '../controllers/index.js'

const router = express.Router();

let initRoutes = (app) => {
    router.get('/',(req,res)=>{
        res.send("hello world");
    })
    // user model
    router.post('/api/signup',userMB.userRegisterMB);
    router.post('/api/signin',userMB.userLoginMB);
    return app.use('/',router);
}
export default initRoutes;