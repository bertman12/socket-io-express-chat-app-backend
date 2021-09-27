import { Router } from "express";
import { dbService } from "../index";

const router = Router();

router.get('/all', (req, res)=>{
    res.json('hiiiii');
});

export default router