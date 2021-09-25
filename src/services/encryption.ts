import bcrypt from 'bcrypt';
import { mynumber } from './user.service';

const ROUNDS:number = 10;
console.log(mynumber);
export function encryptPassword(password: string){
    bcrypt.hash(password, ROUNDS);
}

export function comparePassword(password: string){
    let userPass:string = ''; 
    const isValid = bcrypt.compare(password,userPass);
    return isValid;
}