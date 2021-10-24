import { Router } from "express";
import { dbService } from "..";
import { authService } from "../services/auth";
const router = Router();

router.get('/all', async (req, res, next)=>{
    console.log('Getting all messages!');
    const [data] =  await dbService.execute(`SELECT * FROM messages`);
    res.json(data);
});

router.get('/test', async (req, res, next)=>{
    const response  = authService.verify('');
    console.log('testing the verification');
    // const [data] =  await dbService.execute(`SELECT * FROM messages`);
    res.json({data: response});
});

export default router