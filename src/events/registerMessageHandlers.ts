/** Listen for chat message events, emit them to other clients and store them in the database through a service */
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Message } from "../common/types/message";
import { dbService } from "../index";

export default class MessageHandler{
    constructor(private io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>, private socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>){}
    
    observe(){
        try {
            //only emit events to clients in the appropriate room
            this.socket.on('chat-message', async (message: Message)=>{
                console.log('new message = ', message.content);
                this.io.emit('chat-message', message);
                await dbService.getConnection();
                const data = await dbService.execute(`SELECT * FROM messages`);
                console.log(data);
            });
            this.socket.on('chat-message-edited', (message: Message) => {
                console.log('new edited message = ', message.content);
                this.io.emit('chat-message-edited', message);
            });
            this.socket.on('chat-message-deleted', (message: Message) => {
                console.log('deleted message = ', message.content);
                this.io.emit('chat-message-deleted', message);
            });
        } catch (error) {
            console.log(error);    
        }
    }

}