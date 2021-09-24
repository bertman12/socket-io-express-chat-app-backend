import { Router } from "express";
import DatabaseService from "../services/database.service";
const router = Router();
const db = new DatabaseService();

router.get('/all', (req, res)=>{
    res.json('hiiiii');
});

router.post('', (req, res) =>{
    db.query('', {data: 'lol'});
});

export default router