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
            // const options:jwt.SignOptions = {expiresIn: 10}
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
        try {
            const token:string = input;
            const test = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MywidXNlcm5hbWUiOiJteSB1c2VybmFtZSIsImVtYWlsIjoiZW1haWwzQGVtYWlsLmNvbSIsImJpbyI6Ik15IGJpby4uLiIsImF2YXRhcl9pbWFnZSI6ImltYWdlIHNyYyIsInJvbGUiOjAsInJvb20iOjAsInNlcnZlciI6MH0.eiDvSK5VTzAaRneGRRDPpRga8Titjpfj19WNr-3TbGA'
            const key:jwt.Secret = process.env.JWT_PHRASE || '';
            const payload = jwt.verify(test, key);
            console.log(payload);
            return {isValid: true, payload: payload};
        } catch (error) {
            console.log('Invalid JWT Token!');
            return {isValid: false, payload: 'Invalid JWT Token'}
        }
    }
}

export const authService = new Auth();