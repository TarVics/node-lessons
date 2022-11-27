const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');
const {authRouter, userRouter} = require("./router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.end('Welcome to NODE JS!!!')
});

app.use((err, req, res, next) => {
   res.status(err.status || 500).json({
       message: err.message || 'Unknown error',
       status: err.status || 500
   });
});

app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGO_URL);
    console.log(`Listening on ${config.PORT} port...`);
})