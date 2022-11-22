const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const config = require('./config');
const { carRouter, userRouter } = require('./router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.end('Welcome to node JS!!!');
});

app.use('/cars', carRouter);
app.use('/users', userRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unknown Error',
        status: err.status || 500
    });

    next();
})

app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGO_URL);
    console.log(`Server listening on ${config.PORT} port...`)
})