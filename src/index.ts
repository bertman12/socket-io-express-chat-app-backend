/** Initialize socketio server and setup middleware */
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server, ServerOptions, Socket } from "socket.io";
import { instrument } from '@socket.io/admin-ui';
import MessageHandler from './registerMessageHandlers';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import DatabaseService from './services/database.service';

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

// export const connectionManager = new ConnectionManager();

// connectionManager.connectToDatabase();

// io.use((socket, next)=>{
//   console.log('SocketID: ', socket.id);
//   next();
// });
io.use(() => {
  dbService.getConnection();
})


io.on('connection', (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {
  const messageHandler = new MessageHandler(io, socket);
  messageHandler.observe();
});

httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});