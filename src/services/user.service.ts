import bcrypt from 'bcrypt'
import {User} from '../common/models/user';
import {dbService} from '../index';
import express from 'express';

export class UserService{
    constructor(
        // private password: string, 
        // private username: string, 
        // private email: string, 
        // private bio: string,
        // private avatarImage: string,
        // private role: number,
        // private room: number,
        // private server: number
        ){}

    async register(req: express.Request){
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        console.log('Password was hashed!');

        let SQL: string = `INSERT INTO passwords (userId, password) VALUES(:userId, :password);`;
        let data: {} = {userId: req.body.userId, password: hashedPassword};
        
        // console.log('For the password, SQL is: ', SQL, '\n Data is: ', data);
        dbService.execute(SQL, data);
        
        SQL = `INSERT INTO users 
               (username, email, bio, avatar_image, role, room, server)
        VALUES (:username, :email, :bio, :avatarImage, :role, :room, :server);`;

        data = {
            username: req.body.username,
            email: req.body.email,          
            bio: req.body.bio,            
            avatarImage: req.body.avatarImage,   
            role: req.body.role,           
            room: req.body.room,           
            server: req.body.server  
        };
        // console.log('For the user object, SQL is: ', SQL, '\n Data is: ', data);
        dbService.execute(SQL, data);
    }

    login(){
        console.log('User has logged in!');
    }

    logout(){

    }

    delete(){

    }
}

export const userService = new UserService();