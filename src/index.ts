/** Initialize socketio server and setup middleware */
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server, ServerOptions, Socket } from "socket.io";
import { instrument } from '@socket.io/admin-ui';
import MessageHandler from './events/registerMessageHandlers';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import DatabaseService from './services/database.service';
import mainRoute from './routes/_root'

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

//socket-io admin dashboard
instrument(io, {
  auth: false
});

app.use(cors());
app.use(express.json());

app.use(async (req, res, next)=>{
  await dbService.getConnection();
  next();
  console.log('All endpoints have been satisified!');
  dbService.releaseConnection();
});
app.use('', mainRoute);


//When client connects to the site, connect to the database.
io.use((socket,next) => {
  console.log('SocketID: ',socket.id);
  const messageHandler = new MessageHandler(io, socket);
  messageHandler.observe();
  // next();
  socket.on('disconnect', ()=> {
    console.log('Socket has disconnected, SocketID: ', socket.id);
  });
});

io.on('connection', (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,) => {

  console.log('Socket connected!');
});


httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});