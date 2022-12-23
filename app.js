const http = require('http');
const socketIO = require('socket.io');

/*
* npm i sharp - Ужимання фоток
* */
const swaggerUI = require('swagger-ui-express');
const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');

const config = require('./config');
const {cronRunner} = require('./cron');

// https://petstore.swagger.io/v2/swagger.json
const swaggerJson = require('./swagger.json');
const {authRouter, userRouter} = require("./router");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('static'));

app.use(fileUpload());

// const io = socketIO(server, { cors: 'http://localhost:63342' });
const io = socketIO(server, { cors: 'http://localhost:80' });

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} was dssconected`)
    });

    // console.log(socket.id);
    //
    // console.log(socket.handshake.auth);
    // console.log(socket.handshake.query);

    socket.on('message:send', (messageData) => {
        console.log(messageData.text);

        // SEND ONE TO ONE EVENT
        // socket.emit('message:new', messageData.text);

        // SEND EVENT TO ALL EXCEPT EMITTER
        // socket.broadcast.emit('message:new', messageData.text);

        // SEND EVENT TO ALL CLIENTS
        io.emit('message:new', messageData.text);
    })

    socket.on('room:join', (roomInfo) => {
        socket.join(roomInfo.roomId); // SOCKET JOIN ROOM
        // socket.leave(roomInfo.roomId); // SOCKET LEAVE ROOM

        // SEND TO ALL IN ROOM EXCEPT NEW MEMBER
        // socket.to(roomInfo.roomId).emit('user:room:join', socket.id);

        // SEND TO ALL ROOM MEMBERS
        io.to(roomInfo.roomId).emit('user:room:join', socket.id);
    });
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.get('/', (req, res) => {
    res.end('Welcome to NODE JS!!!')
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message + '(' + err.stack + ')' || 'Unknown error',
        status: err.status || 500
    });
});

/*app*/server.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGO_URL);
    console.log(`Listening on ${config.PORT} port...`);
    cronRunner();
})