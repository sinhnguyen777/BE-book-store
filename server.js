import express from 'express';
import http from 'http';
import cors from 'cors';

import {Server} from 'socket.io';


import events from 'events';

import bodyParser from 'body-parser';

import initSockets from './sockets/index.js';
import connectDB from './config/connectDB.js';
import authSocket from './config/authSocket.js';
import * as configApp from './config/app.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
 


// set max connection event listeners
events.EventEmitter.setMaxListeners(configApp.app.max_event_listeners);

// config connect database
connectDB

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin:*');
    res.header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS');
    next();
})
//config cors for the project
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// init all routers of project


//config server socket
const httpServer = http.Server(app)
const io = new Server(httpServer,
    {
        maxHttpBufferSize: 1e8,
        cors:{
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        },
        transports: ["websocket"]
    } 
);
// auth socket through middleware of socket
authSocket(io);
//init all sockets
initSockets(io);

httpServer.listen(process.env.PORT, ()=>{
    console.log('server is ready');
})
