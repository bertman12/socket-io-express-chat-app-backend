/** Listen for chat message events, emit them to other clients and store them in the database through a service */
import DatabaseService from "./services/database.service";
import { Message } from "./common/types/message";

export default class MessageHandler{
    constructor(private io, private socket){}
    db = new DatabaseService()
    
    observe(){
        try {
            //only emit events to clients in the appropriate room
            this.socket.on('chat-message', (message: Message)=>{
                this.io.emit('chat-message', message);
                this.db.query('', message);
                console.log('check');
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