export interface User {
    id?: number,
    username: string,       //profile, message header, navbar
    email: string,          //profile
    bio: string,            //profile
    avatarImage: string,    //profile, message header, navbar; src string
    role: number,           //authorization
    room: number,           //current room   (child of room room)
    server: number,          //current server (parent server)
//  friends: number[]. Will be implemented as a table utilizing foreign key for association
//  messages: number[]. Will be implemented as a table utilizing foreign key for association
}
