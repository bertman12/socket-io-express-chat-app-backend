export interface Message {
    id: number,         // this id should match the id in the frontend, when the getting the message content for th frontend also include the id
    userId: number,
    serverId: number,   //the room id is enough since the room will be able to identify the server it lives in
    roomId: number,
    content: string,     //chat room
    time?: string
}
