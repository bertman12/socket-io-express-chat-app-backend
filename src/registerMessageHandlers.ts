import { Message } from "./_models/message";

export default class MessageHandler{
    constructor(private io, private socket){}
    
    observe(){
        try {
            this.socket.on('chat-message', (message: Message)=>{
                this.io.emit('chat-message', message);
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