const express = require('express');
const helmet = require('helmet');
const session = require('express-sessions');

const authRouter=require('./data/auth-router');

const server = express();

const sessionConfig ={
    cookie:{
        maxAge: 1000*60*3,
        secure: process.env.SECURE_COOKIE || false,
        httpInly:true
    },
    resave:false,
    saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
    name:'access monster',
    secret:process.env.COOKIE_SHEET || 'secret, it is.'
}

server.use(helmet());
server.use(express.json());

server.use('/api',authRouter);

server.get('/', (req,res) =>{
    res.json({you:'need to login first.'});
})

module.exports = server;