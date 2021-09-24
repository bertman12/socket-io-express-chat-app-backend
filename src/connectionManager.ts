/** Create a connection with the mysql database. */

import mysql from 'mysql2/promise';
import * as dotevn from 'dotenv';
import express from 'express';
import messageRoute from './routes/messages';
dotevn.config();

//****************************** ************ MIDDLEWARE *****************************************************************/
  
export class ConnectionManager{

    constructor(private app: express.Express){}
    
    connect(){
        // const connection = mysql.createConnection({
        //     host: 'localhost',
        //     user: 'root',
        //     database: 'test'
        // });

        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        
        //****************************** ************ MIDDLEWARE *****************************************************************/
        // Establish connection with mySQL 
        // this.app.use(async function mysqlConnection(req: any, res, next) {
        //     try {
        //       const db = await pool.getConnection();
        //       db.config.namedPlaceholders = true;
        
        //       await req.db.query('SET SESSION sql_mode = "TRADITIONAL"');
        //       await req.db.query(`SET time_zone = '-8:00'`);
          
        //       await next();
          
        //       req.db.release();
        //     } catch (err) {
        //       console.log(err)
        //       if (req.db) req.db.release();
        //       throw err;
        //     }
        //   });

        this.app.get('', (req, res) => {
            res.json({message: 'Hello World!', header: req.headers});
        });

        this.app.use('/message',messageRoute);
        
    }

}

export default ConnectionManager;