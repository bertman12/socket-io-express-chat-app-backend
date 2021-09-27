import { Router } from "express";
import { dbService } from "..";
import messageRoute from './messages';

const router:Router = Router();

//get all messages
router.get('', async  (req, res) =>{
    // try {
        const [data] =  await dbService.execute(`SELECT * FROM messages`);
        res.json(data);
        console.log(data);
    // } catch (error) {
    //     console.error(error);        
    // }
});

//move to next middleware!
router.use('',messageRoute);
export default router;
