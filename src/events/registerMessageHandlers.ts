/** Listen for chat message events, emit them to other clients and store them in the database through a service 
 * In future I may want to implement a limit on the number of messages stored for each room
 * TODO: Add default time value using sql date function for the messages' time column
*/
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
                //for the time property of the message i can use the sql Date() function as the default value for the row
                const SQL = `INSERT INTO messages (userId, serverId, roomId, content, time) VALUES (:userId, :serverId, :roomId, :content, :time);`;
                const data = {userId: message.userId, serverId: message.serverId, roomId: message.roomId, content: message.content, time: message.time};
                await dbService.execute(SQL, data);
            });

            this.socket.on('chat-message-edited', async (message: Message) => {
                console.log('new edited message = ', message.content);
                this.io.emit('chat-message-edited', message);
                const SQL = `UPDATE messages SET content = :content WHERE id = :id;`;
                const data = {content: message.content, id: message.id}
                await dbService.execute(SQL, data);
            });

            this.socket.on('chat-message-deleted', async (message: Message) => {
                console.log('deleted message = ', message.content);
                this.io.emit('chat-message-deleted', message);
                const SQL = `DELETE FROM messages WHERE id = :id;`;
                const data = {id: message.id}
                await dbService.execute(SQL, data);
            });

        } catch (error) {
            console.log(error);    
        }
    }

}