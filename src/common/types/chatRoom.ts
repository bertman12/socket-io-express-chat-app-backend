import { ChatServer } from "./chatServer";

export interface ChatRoom extends ChatServer {
    //alias for child room, owned by parent rooms
    id: number,
    serverId: number,
    name: string,
    image: string, //src string
}
