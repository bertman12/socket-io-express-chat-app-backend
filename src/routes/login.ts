import { Router } from "express";
import { userService } from '../services/user.service';

const router = Router();

router.get('/login', async (req, res, next) => {
    console.log('Successfully logged in...');
    const jwtkey = await userService.login(req.body.email, req.body.password);
    res.json({message: 'Successfully logged in...', key: jwtkey});
});

export default router