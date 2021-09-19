// import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
const app = express();
const httpServer = createServer(app);
const options = {
  cors: {
    origin: 'http://localhost:4200', //client-side
    methods: ['GET', 'POST']      
    }
  }

const io = new Server(httpServer,options);
const port = 3000;
// app.use(cors());

app.get('/', (req, res) => {
  // res.sendFile('C:/Users/eddyd/OneDrive/Documents/bay-valley-tech/code-academy/Projects/backend projects/socket-io-chat-app/src/index.html');
});

io.on('connection', (socket) => {
  console.log('user has connected');
  // io.emit('connection', socket.id.slice(0,5));
  console.log('this is the sockset\'s id....', socket.id);

  socket.on('chat message', msg => {
    // io.emit('chat message', msg, socket.id.slice(0,5) );
    io.emit('chat message', msg);
  });

  socket.on('myEvent', (msg) => {
    console.log('I hear the custom event!', msg);
  })

  socket.on('disconnect', () => {
    console.log('A socket has disconnected!');
    io.emit('user_disconnected');
    // io.emit('custom_disconnect', socket.id.slice(0,5));
  });
});

// io.use((socket,next) => {
//   if(socket.data.role === 'admin'){
//     console.log('Admin sockets only beyond this point. BEWARE!!!!!!!')
//     next();
//   }
// })

httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});


//This was listening for server disconnect and not a socket specifically disconnecting
// io.on('disconnect', (socket)=> {
//   io.emit('disconnect');
//   // socket.on('disconnect', () => {
//   // })
// })
