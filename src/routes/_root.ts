import { Router } from "express";
import messageRoute from './messages';
import authorizeRoute from './authorize';
import userLoginRoute from './login';
import registerUser from './registerUser';

export const routes:Router[] = 
[
    //public endpoints
    messageRoute,
    registerUser,
    //private endpoints
    userLoginRoute,
    authorizeRoute,
];

export default routes;

