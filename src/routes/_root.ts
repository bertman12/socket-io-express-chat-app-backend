import { Router } from "express";
import { dbService } from "../index";
import messageRoute from './messages';
import authorizeRoute from './authorize';
import userLoginRoute from './login';
const router:Router = Router();
const routes:Router[] = 
[
    //public endpoints
    messageRoute,
    //private endpoints
    authorizeRoute,
    userLoginRoute
];

//move to next middleware!
router.use(...routes, (req, res, next)=> {
    // console.log('Main route middleware commencing!');
    // next();
    console.log('End of main route...')
    dbService.releaseConnection();
});

export default router;
