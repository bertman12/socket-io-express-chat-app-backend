import { ChatRoom } from "./chatRoom";
import { ChatServer } from "./chatServer";

export interface ChatArea {
    server: ChatServer;
    room: ChatRoom;
}
