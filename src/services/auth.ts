import jwt from 'jsonwebtoken';
import { User } from '../common/models/user';
import * as dotevn from 'dotenv';
dotevn.config();

class Auth{
    /** Jwt encode the user object */
    jwtify(payload: User){
        const key:jwt.Secret = process.env.JWT_PHRASE || '';
        const jwtKey = jwt.sign(JSON.stringify(payload), key);
        console.log('jwtifying!');
        if(!jwtKey) console.log('unable to create jwt');
        return jwtKey;
    }
    /** Request requires a jwt token to pass the verification */
    verify(input:string){
        const token:string = input;
        const key:jwt.Secret = process.env.JWT_PHRASE || '';
        jwt.verify(token, key);
    }
}
export const authService = new Auth();













/**
 * 
 * @param email 
 * @param password 
 * @param payload If registering a user, use the form data to create the payload instead of querying for a user
 */
// async login(email: string, password: string, payload?: User){
    
//     // let userPayload!: User;
//     // let verifiedUserId: number = -1;
//     // if(payload){
//     //     userPayload = payload;
//     //     if(payload.id){
//     //         verifiedUserId = payload.id;
//     //     }
//     // }
//     // else{
//     //     const SQL = `SELECT * FROM users WHERE email = :email`;
//     //     const data = {email: email};
//     //     [userPayload] = await dbService.execute(SQL, data);
        
