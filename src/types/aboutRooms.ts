export interface PlayerType {
  socketId: string;
  userId: string;
  nickname: string;
  isRoomChief: boolean;
}

export interface CreateOrJoinSocketRoomArgs {
  roomId: string;
  userId: string;
  nickname: string;
}

export interface HandleGameStateSocketArgs {
  userId: string;
  roomId: string;
  state: boolean;
}

export interface QuitGameArgs {
  roomId: string;
  userId: string;
}

export interface Room {
  state: boolean;
  players: PlayerType[];
}

export type Rooms = Record<string, Room>;
