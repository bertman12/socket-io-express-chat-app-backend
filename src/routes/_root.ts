import { Router } from "express";
import { dbService } from "..";
import messageRoute from './messages';

const router:Router = Router();

router.get('', async  (req, res) =>{
    try {
        const [data] =  await dbService.execute(`SELECT * FROM messages`);
        res.json({Data: data, message:'Good service!'});
    } catch (error) {
        console.error(error);        
    }
});

router.use('',messageRoute);

export default router;
