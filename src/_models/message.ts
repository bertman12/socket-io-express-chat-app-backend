export interface Message {
    id: number,         //is the nth message in the relative room
    userId: number,
    serverId: number,   //the room id is enough since the room will be able to identify the server it lives in
    roomId: number,
    content: string,     //chat room
    time?: string
}
