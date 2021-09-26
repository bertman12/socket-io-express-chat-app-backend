import bcrypt from 'bcrypt';

const _ROUNDS:number = 10;
// const obj = {fn: encryptPassword};
// obj.fn('');

export async function encryptPassword(password: string):Promise<string>{
    return await bcrypt.hash(password, _ROUNDS);
}

export async function comparePassword(password: string):Promise<boolean>{
    let userPass:string = ''; 
    const isValid:boolean = await bcrypt.compare(password,userPass);
    return isValid;
}