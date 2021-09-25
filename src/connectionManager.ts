/** Create a connection with the mysql database. */
import mysql from 'mysql2/promise';
import * as dotevn from 'dotenv';
dotevn.config();
  
export class ConnectionManager{

    constructor(){}
    
    private _connection!: mysql.PoolConnection;
    private _pool:mysql.Pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        // waitForConnections: true,
        // connectionLimit: 1,
        // queueLimit: 0
    });

    forceDisconnect(){
        if(this._connection){
            this._connection.release();
            console.log('You have been force disconnected!');
        }
        else{
            console.log('No connection to disconnect from.');
        }
    }

    async connectToDatabase(){
            const pool: mysql.Pool = this._pool;
            try {
                console.log('Attempting connection...');
                this._connection = await pool.getConnection();
                this._connection.config.namedPlaceholders = true;
                console.log('Connected!');

                await this._connection.query('SET SESSION sql_mode = "TRADITIONAL"');
                await this._connection.query(`SET time_zone = '-8:00'`);
                return this._connection;
            } 
            catch (err) {
                console.log(err);
                if (this._connection) this._connection.release();
                throw err;
            }
    }
}


export default ConnectionManager;