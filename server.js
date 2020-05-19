const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const cors = require('cors');
const authRouter=require('./data/auth-router');

const server = express();

const sessionConfig ={
    cookie:{
        maxAge: 1000*15,
        secure: process.env.SECURE_COOKIE || false,
        httpOnly:true
    },
    resave:false,
    saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
    name:'access monster',
    secret:process.env.COOKIE_SHEET || 'secret, it is.'
};
server.use(session(sessionConfig));

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api',authRouter);

server.get('/', (req,res) =>{
    res.json({you:'need to login first.'});
})

module.exports = server;