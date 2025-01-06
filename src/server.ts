import express, { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import { handleSocketIOEvemts } from './api/socket';

const app: Express = express();

app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'https://word-chain-game-mocha.vercel.app',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Access-Control-Allow-Origin'],
    credentials: true,
  },
});

handleSocketIOEvemts(io);

const port = process.env.PORT || 5000;

httpServer.listen(port, () => {
  console.log(`> Ready on port ${port}`);
});

module.exports = app;
