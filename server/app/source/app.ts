import express, { Request, Response } from 'express';
import { Server as ServerIo } from 'socket.io';
import http from 'http';
import cors from 'cors';
import AuthService from './services/auth_service';
import { Connection } from './managers/connection';


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
  let tokenObject:string = '';
  if ((typeof socket.handshake.query.token) === 'string' )
      tokenObject = <string>socket.handshake.query.token;
  else{
    socket.emit('authentication failed', { message: 'Disconnected', session: socket.id });
    socket.disconnect();
  }
  if (!authService.authUser(tokenObject)) {
    socket.emit('authentication failed', { message: 'Disconnected', session: socket.id });
    socket.disconnect();
  }else{
    socket.emit('authenticated', { message: 'Ready to chat', session: socket.id });
    console.log(socket.handshake.query.token)
  }
  return next();
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
      room: chat.room
    });
    // io.in("room1").socketsLeave("room1");
  });
});

export default server;

