import { Router } from "express";
const router = Router();

router.get('/login', async (req, res, next) => {
    console.log('Successfully logged in...');
    res.json('Successfully logged in...');
});

export default router