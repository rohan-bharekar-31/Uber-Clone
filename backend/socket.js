// initSocketServer.js
import { Server } from 'socket.io';
import userModel from './models/user.model.js';
import captainModel from './models/captain.model.js';

let io = null;

export const initSocketServer = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: '*', // Replace with your frontend URL in production
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`✅ Client connected: ${socket.id}`);

        socket.on("join", async (data) => {
            const { userId, userType } = data;

            if (userType == "user") {
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })
            }
            else {
                await captainModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })

            }
        })

        socket.on('disconnect', () => {
            console.log(`❌ Client disconnected: ${socket.id}`);
        });

        socket.on("update-location-captain", async (data) => {
            const { userId, location } = data;
            if (!location || !location.lng || !location.ltd) {
                socket.emit('location-error', { message: 'Invalid location data' });
                return;
            }
            
            // console.log(`User ${userId} updated location to ltd:${location.ltd} and lng:${location.lng}`);
            const res=await captainModel.findByIdAndUpdate(userId, { location:{
                ltd:location.ltd,
                lng:location.lng
            }})
        })
    });

    return io;
};

export const sendMessage=(socketId,messageObject)=>{
    // console.log(socketId+" "+messageObject.event,messageObject.data )
    io.to(socketId).emit(messageObject.event,messageObject.data);
}

export const getIO = () => {
    if (!io) throw new Error('Socket.io not initialized!');
    return io;
};
