/**
 * Practice using namespaces
 */
import bcrypt from 'bcrypt';

const _ROUNDS:number = 10;
namespace encrypter{
    export async function encryptPassword(password: string):Promise<string>{
        return await bcrypt.hash(password, _ROUNDS);
    }
    export async function comparePassword(enteredPassword: string, storedPassword:string):Promise<boolean>{
        return await bcrypt.compare(enteredPassword, storedPassword);
    }
}

export default encrypter