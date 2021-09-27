import { Router } from "express";
import { dbService } from "..";
const router = Router();

router.get('/all', async (req, res)=>{
    console.log('Getting all messages!');
    const [data] =  await dbService.execute(`SELECT * FROM messages`);
    res.json(data);
});

export default router