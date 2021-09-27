/** Desc: Initialize socketio server and setup middleware
 * TODO
 * Implement emitting events only to clients in the room the event was generated in for the message events
 * Add in the socketio admin dashboard later
 */
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server, ServerOptions, Socket } from "socket.io";
import MessageHandler from './events/registerMessageHandlers';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import DatabaseService from './services/database.service';
import mainRoute from './routes/_root';

export const dbService = new DatabaseService();
export const app = express();

const httpServer = createServer(app);
const serverOptions: Partial<ServerOptions> = {
  cors: {
    origin: 'http://localhost:4200', //client-side
    methods: ['GET', 'POST']      
    }
}

const io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap> = new Server(httpServer,serverOptions);
const port: number = 3000;

app.use(cors());
app.use(express.json());

app.use('', async (req, res, next)=>{
  await dbService.getConnection();
  next();
  console.log('All endpoints have been satisified!');
  dbService.releaseConnection();
}, mainRoute);

//When client connects to the site, connect to the database.
io.use((socket,next) => {
  console.log('Socket connected! SocketID: ',socket.id);
  next();
  socket.on('disconnect', ()=> {
    console.log('Socket has disconnected, SocketID: ', socket.id);
  });
});

// TODO: Whenever any event happens, setup a connection to the database
io.on('connection', (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,) => {
  const messageHandler = new MessageHandler(io, socket);
  messageHandler.register();
});

httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});



// const registeredEvents = [
//   {name: 'test', eventHandler: function handler(...args: any[]){}, socket: Socket, data: {}}
// ];

// io.use((socket, next) => {
//   registeredEvents.forEach((event)=>{
//     socket.on(event.name, (data:any)=>{
//       event.eventHandler(data, socket)
//     })
//   });
// });


  // console.log('Socket events registered: ', socket.eventNames());
