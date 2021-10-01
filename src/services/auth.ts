import jwt from 'jsonwebtoken';
import { User } from '../common/models/user';
import * as dotevn from 'dotenv';
dotevn.config();

class Auth{
    /** Jwt encode the user object
     * If you set the expiration time to be small will it generate a new jwt if it has expired?
     */
    jwtify(payload: User){
        if(process.env.JWT_PHRASE){
            
            const key:jwt.Secret = process.env.JWT_PHRASE;
            const jwtKey = jwt.sign(JSON.stringify(payload), key);
            console.log('jwtifying!');
            if(!jwtKey) console.log('unable to create jwt');
            return jwtKey;
        }
        return 'NO JWT PHRASE';
    }

    /** Request requires a jwt token to pass the verification */
    verify(input:string){
        const token:string = input;
        const key:jwt.Secret = process.env.JWT_PHRASE || '';
        jwt.verify(token, key);
    }
}
export const authService = new Auth();