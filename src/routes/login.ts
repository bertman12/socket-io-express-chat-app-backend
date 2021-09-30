import { Router } from "express";
import { userService } from '../services/user.service';

const router = Router();

router.get('/login', async (req, res, next) => {
    // console.log('Successfully logged in...');
    const jwtToken = await userService.login(req.body.email, req.body.password);
    if(jwtToken){
        res.json(`Successfully logged in ... Token = ${jwtToken}`);
    }
    else{
        res.json(`Unable to login ... Token = ${jwtToken}`);
    }
});

export default router