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
                console.log('new message = ', message.content);
                this.io.emit('chat-message', message);
                await dbService.getConnection();
                const SQL = `INSERT INTO messages (content) VALUES ('ay')`;
                console.log('adding message');
                await dbService.execute(SQL);
                console.log('message added');
                const [data]:any =  await dbService.execute(`SELECT * FROM messages`);
                console.log(data[0].content);
            });
            this.socket.on('chat-message-edited', async (message: Message) => {
                console.log('new edited message = ', message.content);
                this.io.emit('chat-message-edited', message);
                await dbService.getConnection();
                const [data]:any =  await dbService.execute(`SELECT * FROM messages`);
                console.log(data[0].content);
            });
            this.socket.on('chat-message-deleted', async (message: Message) => {
                console.log('deleted message = ', message.content);
                this.io.emit('chat-message-deleted', message);
                await dbService.getConnection();
                const [data]:any =  await dbService.execute(`SELECT * FROM messages`);
                console.log(data[0].content);
            });
        } catch (error) {
            console.log(error);    
        }
    }

}