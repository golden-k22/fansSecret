
import { Server } from "socket.io";

let io:any;

export const initSocket = (server:any) => {
  if (!io) {
    io = new Server(server, {
      path: "/api/socketio", 
      cors: {
        origin: "*", 
        methods: ["GET", "POST"],
      },
    });

   
    io.on("connection", (socket:any) => {
      console.log(`User connected: ${socket.id}`);

   
      socket.on("newMessage", (message:any) => {
        io.emit("newMessage", message); 
      });

 
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  return io;
};

export const getSocket = () => {
    
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  console.log("SOCKET INITIALIZED ")
  return io;
};
