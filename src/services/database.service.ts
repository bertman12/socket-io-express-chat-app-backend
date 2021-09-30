/** Get and release database connections and execute queries */
// import { SqlOptions } from "../common/types/sqlOptions";
import { error } from 'console';
import mysql from 'mysql2/promise';
import ConnectionManager from "./connectionManager";

export class DatabaseService{
    constructor(){}
    private _connectionManager:ConnectionManager = new ConnectionManager();
    private _connection!: mysql.PoolConnection;

    async getConnection(){
        this._connection = await this._connectionManager.connectToDatabase();
    }

    /**
     * I could maybe add my a function that returns a promise to see if all sql queries are done before running release connection
     * All queries work anyways so I'm not sure why my console.logs are out of place.
     * await queriesDone(); ... continue
     */
    releaseConnection(){
        this._connectionManager.forceDisconnect();
    }

    /** 
     * Creates a connection when making queries for socketio triggered events, then executes the query. 
    */
    async execute(sql:string, data?:{}): Promise<any>{
        try {
            if(!this._connection){
                await this.getConnection();
                console.log('Reconnected!');
                await this.execute(sql, data);
            }
            else{
                if(data){
                    return await this._connection.query(sql, data);
                }
                else{
                    return await this._connection.query(sql);
                }
            }
        } catch (error) {
            console.error(error);
        }
        throw error('Query execution failed due to either not being to get a connection or unable to make a query. Check data types passed into execute function!');
    }
}

export default DatabaseService;