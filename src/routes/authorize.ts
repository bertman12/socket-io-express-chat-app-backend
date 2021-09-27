import { Router } from "express";
// import { dbService } from "../index";
const router = Router();

router.use(async (req, res, next) => {
    console.log('Authorization complete...');
    next();
    // await dbService.releaseConnection();
});

export default router