import express, { Request, Response } from 'express';
import { Server as ServerIo } from 'socket.io';
import http from 'http';
import cors from 'cors';
import AuthService from './services/auth_service';


const app = express();
app.use(cors);

const authService = new AuthService();
const server = http.createServer(app);
const io = new ServerIo(server, {
  cors: {
    origin: '*',
  }
});

io.use((socket, next) => {
  // let tokenObject = JSON.parse(socket.handshake.query.token)
  // console.log(authService.authUser(socket.handshake.query.token));
  // if(!authService.authUser(data.token)){
  //   socket.emit('authentication failed', { message: 'Disconnected', session: socket.id }); 
  //   socket.disconnect();
  // }
  // socket.emit('authenticated', { message: 'Ready to chat', session: socket.id }); 
  console.log(socket.handshake.query.token)
  return socket.disconnect();
});

io.on('connection', socket => {
  
  socket.emit('on connected', { message: 'connected', session: socket.id }); 
  console.log(socket.id);

  socket.on('on loaded', data => {

  });

  socket.on('new message', chat => {
    console.log(chat)
    io.to(chat.room).emit('message received', {
      user: chat.session.id,
      message: chat.message,
      timesmap: chat.timestamp,
      room : chat.room
    });
    // io.in("room1").socketsLeave("room1");
  });
});

export default server;

