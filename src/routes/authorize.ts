/**
 * Verify they have an authorization header along with a jwt key to ensure the user is logged in and able to access the endpoint for users logged in
 */
import { Router } from "express";
import { userService } from '../services/user.service';

const router = Router();

router.use(async (req, res, next) => {
    userService.verify();
    console.log('Authorization complete...');
    next();
});

export default router