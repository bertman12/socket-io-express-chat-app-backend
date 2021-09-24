/** Create a connection with the mysql database. */
import mysql from 'mysql2/promise';
import * as dotevn from 'dotenv';
import { app } from './index';
import messageRoute from './routes/messages';
dotevn.config();

let _connection!:mysql.PoolConnection;
  
export class ConnectionManager{

    constructor(){}
    // app:express.Express = app;
    
    private _connection!: mysql.PoolConnection;
    private _pool:mysql.Pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 10
    });

    forceDisconnect(){
        if(_connection){
            _connection.release();
            console.log('You have been force disconnected!');
        }
        else{
            console.log('No connection to disconnect from.');
        }
    }

    async connectToDatabase(){
        const pool: mysql.Pool = this._pool;
        this._connection = await pool.getConnection();
        const connection = this._connection; 
        // this._connection = await pool.getConnection();
        // console.log('\n\n\nThe connection config', this._connection.config, '\n\n\n');
        // console.log('\n\n\nthe express app',app, '\n\n\n');
        app.use(async function mysqlConnection(req:any, res, next) {
            try {
              req.db = connection; 
              _connection = req.db;
              
              req.db.config.namedPlaceholders = true;

              await req.db.query('SET SESSION sql_mode = "TRADITIONAL"');
              await req.db.query(`SET time_zone = '-8:00'`);
              
              await next();
              req.db.release();
            } 
            catch (err) {
              console.log(err)
              if (req.db) req.db.release();
              throw err;
            }
        });

        app.get('', (req, res, ) => {
            res.json({message: 'Hello World!', header: req.headers});
        });

        app.use('/message',messageRoute);

    }

}

export default ConnectionManager;