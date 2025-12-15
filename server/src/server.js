require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

const server = http.createServer(app);

// Socket.io Setup
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

const Message = require('./models/Message');

// ...

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('chat:message', async (data) => {
        const { room, sender, content } = data;
        try {
            const message = await Message.create({ room, sender, content });
            const populatedMessage = await message.populate('sender', 'name');
            io.to(room).emit('chat:message', populatedMessage);
        } catch (error) {
            console.error('Socket message error:', error);
        }
    });

    socket.on('chat:typing', (data) => {
        socket.to(data.room).emit('chat:typing', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
