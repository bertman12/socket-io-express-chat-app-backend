import { Router } from "express";
import { userService } from '../services/user.service';

const router = Router();

router.post('/register', async (req, res, next) => {
    console.log('Data sent to the registration endpoint ... ',req.body);
    const jwtkey = await userService.register(req);
    res.json({message: 'Successfully registered user...', key: jwtkey});
});

export default router

