import { Router } from "express";
const router = Router();

router.use(async (req, res, next) => {
    console.log('Authorization complete...');
    next();
});

export default router