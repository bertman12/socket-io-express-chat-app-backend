import bcrypt from 'bcrypt'
import { User } from '../common/models/user';
import { dbService } from '../index';
import express from 'express';
import { authService } from './auth';

export class UserService{
    constructor(){}

    async register(req: express.Request){
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        const passSQL: string = `INSERT INTO passwords (userId, password) VALUES(:userId, :password);`;
        const passData = {userId: req.body.userId, password: hashedPassword};
        
        dbService.execute(passSQL, passData);
        
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
        //after inserting the user into the database get the id from the last row inserted and pass that to the login function so that we can use
        const [response] = await dbService.execute(userSQL, userData);
        console.log(response);
        userData.id = response.id;
        return await this.login(req.body.email, req.body.password, userData);
    }

    async getUser(email:string){
        const SQL = `SELECT * FROM users WHERE email = :email`;
        const data = {email: email};
        const [user] = await dbService.execute(SQL, data);
        return user;
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

        return await dbService.execute(userSQL, userData);
        // const user:User = response;
        // return user;
    }

    verify(){
        // authService.jwtify();
    }


       /**
     * 
     * @param email 
     * @param password 
     * @param payload If registering a user, use the form data to create the payload instead of querying for a user
     */
    async login(email: string, password: string, userData?: User){

        let user!: User;
        let verifiedUserId: number = -1;
        if(userData){
            user = userData;
            if(userData.id){
                verifiedUserId = userData.id;
            }
        }
        else{
            const SQL = `SELECT * FROM users WHERE email = :email`;
            const data = {email: email};
            [user] = await dbService.execute(SQL, data);
            
        }
        
        //check if password is valid, and if it is then get the user id from the password table
        //then find and generate your userData using the user id
        //get the password using the user id to make the query
        const SQL = `SELECT * FROM passwords WHERE userId = :userId`;
        const data = {userId: verifiedUserId};
        const hashedPassword = await dbService.execute(SQL, data); 

        const isValid = await bcrypt.compare(password, hashedPassword)
        if(isValid){
            console.log('Password is valid');
        }


        // return await authService.login(email,password, userData);

    }

    logout(){

    }

    delete(){

    }
}

export const userService = new UserService();