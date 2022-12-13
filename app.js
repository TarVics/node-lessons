const swaggerUI = require('swagger-ui-express');
const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');
const {cronRunner} = require('./cron');

// https://petstore.swagger.io/v2/swagger.json
const swaggerJson = require('./swagger.json');
const {authRouter, userRouter} = require("./router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGO_URL);
    console.log(`Listening on ${config.PORT} port...`);
    cronRunner();
})