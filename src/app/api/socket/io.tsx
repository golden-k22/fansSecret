// src/app/api/socket/io.ts
import { Server } from 'socket.io';
import { initSocket } from '../../../socket/socket';

export default function handler(req: any, res: any) {
  if (res.socket.server.io) {
    console.log('Socket.io already running');
  } else {
    console.log('Initializing Socket.IO');
    initSocket(res.socket.server);
  }
  res.end();
}