import { PlayerType } from '../types/aboutRooms';

const moveRoomChief = (players: PlayerType[]) => {
  const roomChief = players.find(({ isRoomChief }) => isRoomChief === true);
  if (roomChief === undefined) players[0] = { ...players[0], isRoomChief: true };

  return players;
};

export const quitRoom = (quitPlayerId: string, players: PlayerType[]) => {
  const newPlayers = players.filter(({ userId }) => userId !== quitPlayerId);
  if (newPlayers.length === 0) return [];

  return moveRoomChief(newPlayers);
};
// import express, { Express, Request, Response } from 'express';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import cors from 'cors';
// import {
//   CreateOrJoinSocketRoomArgs,
//   HandleGameStateSocketArgs,
//   QuitGameArgs,
//   Room,
//   Rooms,
// } from './types/aboutRooms';
// import { quitRoom } from './utils/quitRoom';

// const app: Express = express();

// app.use(cors());

// export default function handler(req: Request, res: Response) {
//   return new Promise((resolve) => {
//     const httpServer = createServer();

//     const io = new Server(httpServer, {
//       cors: {
//         origin: ['http://localhost:3000', 'https://word-chain-game-mocha.vercel.app'],
//         methods: ['GET', 'POST'],
//         credentials: true,
//       },
//     });

//     app.use(express.json());

//     const rooms: Rooms = {};

//     io.on('connection', (socket) => {
//       console.log('socket io connect');

//       socket.on('createRoom', ({ roomId, userId, nickname }: CreateOrJoinSocketRoomArgs) => {
//         socket.join(roomId);

//         const isValidRoom = rooms[roomId] == undefined;
//         if (isValidRoom) {
//           const room: Room = {
//             state: false,
//             players: [{ socketId: socket.id, userId, nickname, isRoomChief: true }],
//           };
//           rooms[roomId] = room;
//           socket.emit('createRoomSuccess', rooms[roomId]);
//         } else {
//           socket.emit('createRoomFail', '잠시후 다시 시도해주세요.');
//         }
//       });

//       socket.on('joinRoom', ({ roomId, userId, nickname }: CreateOrJoinSocketRoomArgs) => {
//         const isValidRoom = rooms[roomId] != undefined;
//         if (isValidRoom) {
//           socket.join(roomId);
//           rooms[roomId].players.push({
//             socketId: socket.id,
//             userId,
//             nickname,
//             isRoomChief: false,
//           });
//           socket.emit('joinRoomSuccess', rooms[roomId]);
//           socket.to(roomId).emit('updateUser', rooms[roomId]);
//         } else {
//           socket.emit('joinRoomFail', '방 코드를 확인해주세요.');
//         }
//       });

//       socket.on('quitGame', ({ roomId, userId }: QuitGameArgs) => {
//         const afterUsers = quitRoom(userId, rooms[roomId].players);
//         if (afterUsers.length === 0) delete rooms[roomId];
//         else {
//           rooms[roomId].players = afterUsers;
//           socket.to(roomId).emit('updateUser', rooms[roomId]);
//         }
//       });

//       socket.on('handleGameState', ({ userId, roomId, state }: HandleGameStateSocketArgs) => {
//         const player = rooms[roomId].players.find((player) => player.userId === userId);
//         if (!player) socket.emit('handleGameStateFail', '방 오류 발생!');
//         else {
//           const isRoomChief = player.isRoomChief === true;
//           if (!isRoomChief) socket.emit('handleGameStateFail', '방장이 아닙니다!');
//           else {
//             rooms[roomId].state = state;
//             socket.emit('handleGameStateSuccess', `game state is ${state}`);
//             socket.to(roomId).emit('gameStateIsChange', { gameState: state });
//           }
//         }
//       });
//     });

//     resolve();
//   })
// }

// module.exports = app;
