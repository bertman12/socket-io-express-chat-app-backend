/** Get and release database connections and execute queries */
// import { SqlOptions } from "../common/types/sqlOptions";
import mysql from 'mysql2/promise';
import ConnectionManager from "./connectionManager";

export class DatabaseService{
    constructor(){}
    private _connectionManager:ConnectionManager = new ConnectionManager();
    private _connection!: mysql.PoolConnection;

    async getConnection(){
        this._connection = await this._connectionManager.connectToDatabase();
    }

    releaseConnection(){
        this._connectionManager.forceDisconnect();
    }

    // query(sqlOptions:SqlOptions){
    //     // const selections = args.join(',').toUpperCase();
    //     let options:string = 'NO SELECTIONS';
    //     if(sqlOptions.selections.length > 1){
    //         options = sqlOptions.selections.join(',');
    //     } else{
    //         options = sqlOptions.selections[0];
    //     }
    //     const SQL:string = `${sqlOptions.action} ${options} FROM ${sqlOptions.table}${sqlOptions.condition ? ` WHERE ${sqlOptions.condition}`: ''}`;
    //     console.log(SQL);    
    // }

    /** 
     * If no connection exists, then set up connection then execute query.
     * This should only happen when making queries for socketio triggered events. 
     * TODO implement TRY-CATCH, always return the error array 
    */

    async execute(sql:string, data?:{}){
        try {
            if(!this._connection){
                await this.getConnection();
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
        return ['QUERY FAILED'];
    }
}

export default DatabaseService;