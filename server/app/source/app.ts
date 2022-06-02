import 'dotenv/config';
import express from 'express';
import { Server as ServerIo } from 'socket.io';
import http from 'http';
import cors from 'cors';
import AuthService from './services/auth_service';
import { Connection } from './classes/connection';


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
  let tokenObject: string = '';
  if ((typeof socket.handshake.query.token) === 'string')
    tokenObject = JSON.parse(<string>socket.handshake.query.token);
  else {
    socket.emit('authentication failed', { message: 'Disconnected', session: socket.id });
    socket.disconnect();
  }
  if (!authService.authUser(tokenObject)) {
    socket.emit('authentication failed', { message: 'Disconnected', session: socket.id });
    socket.disconnect();
  } else {
    socket.emit('authenticated', { message: 'Ready to chat', session: socket.id });
    console.log(socket.handshake.query.token);
  }
  return next();
});

io.on('connection', socket => {
  let tokenObject = JSON.parse(<string>socket.handshake.query.token);
  const connection = new Connection(
    tokenObject?.course_class_id,
    socket.id, tokenObject?.course_id,
    tokenObject?.user_id
  );

  socket.emit('on connected', { message: 'connected', session: connection.socket_id });

  socket.on('on loaded', data => {
    socket.join(connection.course_class_id);
    console.log('joined room ' + connection.course_class_id);
  });

  socket.on('new message', data => {
    io.to(connection.course_class_id).emit('message received', {
      message: data.message,
      timestamp: data.timestamp,
    });
  });

  socket.on('on closing', data => {
    io.in(connection.course_class_id).socketsLeave(connection.course_class_id);
  });

});

export default server;

