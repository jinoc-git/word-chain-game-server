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
