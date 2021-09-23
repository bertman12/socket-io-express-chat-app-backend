import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import { instrument } from '@socket.io/admin-ui';
import mysql from 'mysql2';
// import { generateToken } from './auth';
import MessageHandler from './registerMessageHandlers';
import * as dotevn from 'dotenv';

dotevn.config();

const app = express();
const httpServer = createServer(app);

const options = {
  cors: {
    origin: 'http://localhost:4200', //client-sidez
    methods: ['GET', 'POST']      
    }
}

const pool:mysql.Pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const io = new Server(httpServer,options);
const port = 3000;

app.use(cors());
app.use(express.json());


app.get('/', (req: {}, res: {}) => {

});

instrument(io, {
  auth: false
});

io.on('connection', (socket) => {

  const messageHandler = new MessageHandler(io, socket);
  messageHandler.observe();

  socket.on('disconnect', (socket) => {
    console.log('A socket has disconnected!');
    io.emit('user_disconnected');
  });
});

httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});

// console.log('user has connected');kubjkb
// console.log('this is the sockset\'s id....', socket.id);
