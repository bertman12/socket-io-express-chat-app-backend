/** Listen for chat message events, emit them to other clients and store them in the database through a service */
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Message } from "../common/models/message";
import { dbService } from "../index";

export default class MessageHandler{
    constructor(private io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>, private socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>){}
    
    register(){
        try {
            //only emit events to clients in the appropriate room
            this.socket.on('chat-message', async (message: Message)=>{
                this.io.emit('chat-message', message);
                const SQL = `INSERT INTO messages (content) VALUES (:content);`;
                const data = {content: message.content};
                await dbService.execute(SQL, data);

                //have socket emit an event and pass the sql query in there. 
                //put boiler plate db execution code into the event handler
                //maybe i could emit a sql query event from the front end instead of the backend to handle making the db execution
            });

            this.socket.on('chat-message-edited', async (message: Message) => {
                console.log('new edited message = ', message.content);
                this.io.emit('chat-message-edited', message);
            });

            this.socket.on('chat-message-deleted', async (message: Message) => {
                console.log('deleted message = ', message.content);
                this.io.emit('chat-message-deleted', message);
            });
        } catch (error) {
            console.log(error);    
        }
    }

}