import { Router } from "express";
import { userService } from '../services/user.service';

const router = Router();

router.post('/register', async (req, res, next) => {
    console.log(req.body);
    await userService.register(req);
    res.json('Successfully registered user...');
});

export default router