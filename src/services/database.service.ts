/** Get and release database connections and execute queries */
// import { SqlOptions } from "../common/types/sqlOptions";
import mysql from 'mysql2/promise';
import ConnectionManager from "../connectionManager";
export class DatabaseService{
    constructor(){}
    private _connectionManager:ConnectionManager = new ConnectionManager();
    private _connection!: mysql.PoolConnection;

    async getConnection(){
        console.log('Connecting to database.');  
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

    async execute(sql:string, data?:any){
        return await this._connection.query(sql);
    }

}

export default DatabaseService;