import bcrypt from 'bcrypt'
import { User } from '../common/models/user';
import { dbService } from '../index';
import express from 'express';
import { authService } from './auth';

export class UserService{
    constructor(){}

    async register(req: express.Request){
        await this.addUser(req);
        const user:User = await this.getUser(req.body.email);
        if(user.id){
            await this.addPassword(req, user.id);
        }
        else throw new Error('Unable to add user or password!'); 

        const jwtToken = await this.login(user.email, req.body.password);
        return jwtToken;
    }

    async addPassword(req:express.Request, userId:number){
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        const SQL: string = `INSERT INTO passwords (userId, password) VALUES(:userId, :password);`;
        const data = {userId: userId, password: hashedPassword};
        dbService.execute(SQL, data);
    }
    
    async addUser(req: express.Request){
        const userSQL = `INSERT INTO users 
        (username, email, bio, avatar_image, role, room, server)
        VALUES (:username, :email, :bio, :avatarImage, :role, :room, :server);`;
        const userData: User = {
            username: req.body.username,
            email: req.body.email,          
            bio: req.body.bio,            
            avatarImage: req.body.avatarImage,   
            role: req.body.role,           
            room: req.body.room,           
            server: req.body.server  
        };
        await dbService.execute(userSQL, userData);
    }
    
    async getUser(email:string):Promise<User>{
        const SQL = `SELECT * FROM users WHERE email = :email`;
        const data = {email: email};
        const [[user]] = await dbService.execute(SQL, data);
        if(user.length > 1){
            throw new Error('To many users have the same email!');
        }
        return user;
    }

    /**
     * Verify that the user exists and the password is valid.
     * Then you will return a jwt token to the front end so the user can reach restricted endpoints
     * @param email 
     * @param password 
     * @returns 
     */
    async login(email: string, password: string):Promise<string>{
        try {
            const user:User = await this.getUser(email);
            let passwordVerified: boolean = false;
            console.log('Beggining the login process...', user.id);
            if(user.id){
                console.log('verifying the password now...');
                passwordVerified = await this.checkPassword(user.id, password);
                if(passwordVerified){
                    console.log('Verifying the user now...');
                    return authService.jwtify(user);
                }
            }
        } catch (err) {
            console.error('Unable to login!', err);
            // throw new Error('\nUser does not exist! Unable to login!\n');
        }
        return 'User does not exist! Unable to login!';
    }

    async checkPassword(userId: number, testInput:string):Promise<boolean>{
        try {
            const SQL = `SELECT * FROM passwords WHERE userId = :userId`;
            const data = {userId: userId};
            const [[hashedPassword]] = await dbService.execute(SQL, data); 
            console.log('Stored password ... ',hashedPassword.password.toString());
            let isValid:boolean = false;
            isValid = await bcrypt.compare(testInput, hashedPassword.password.toString());
            console.log('Password is ', isValid);
            return isValid
        } catch (error) {
            console.error(error);
            return false
        }
    }

    delete(){

    }
}

export const userService = new UserService();