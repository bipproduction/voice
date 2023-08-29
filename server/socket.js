const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

const option = {
    allowEIO3: true,
    cors: {
        origin: true,
        credentials: true,
    }
};
const io = new Server(server, option);
app.use(cors());

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat', data => {
        socket.emit('chat', data)
        console.log(data, "ini diserver")
    })
});



server.listen(3000, () => {
    console.log('listening on *:3000');
});
