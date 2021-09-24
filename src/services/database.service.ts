import { SqlOptions } from "../common/types/sqlOptions";
// import { connectionManager } from "../index";
import ConnectionManager from "../connectionManager";

// connectionManager.connectToDatabase
// console.log(connectionManager);
export class DatabaseService{

    constructor(){}
    private readonly connectionManager:ConnectionManager = new ConnectionManager();
    
    getConnection(){
        console.log('getting connection!');  
        this.connectionManager.connectToDatabase();
    }

    query(sqlOptions:SqlOptions){
        // const selections = args.join(',').toUpperCase();
        let options:string = 'NO SELECTIONS';
        if(sqlOptions.selections.length > 1){
            options = sqlOptions.selections.join(',');
        } else{
            options = sqlOptions.selections[0];
        }

        const SQL:string = `${sqlOptions.action} ${options} FROM ${sqlOptions.table}${sqlOptions.condition ? ` WHERE ${sqlOptions.condition}`: ''}`;
        console.log(SQL);    
    }

}

export default DatabaseService;