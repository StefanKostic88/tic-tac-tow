import { GameCube, WinnerData } from "../models/game.models";

export const gameCubes: GameCube[] = [
  { winner: false, cubeId: 1, touched: false, player: null },
  { winner: false, cubeId: 2, touched: false, player: null },
  { winner: false, cubeId: 3, touched: false, player: null },
  { winner: false, cubeId: 4, touched: false, player: null },
  { winner: false, cubeId: 5, touched: false, player: null },
  { winner: false, cubeId: 6, touched: false, player: null },
  { winner: false, cubeId: 7, touched: false, player: null },
  { winner: false, cubeId: 8, touched: false, player: null },
  { winner: false, cubeId: 9, touched: false, player: null },
];

export const winnerData: WinnerData = [
  [{ id: 1 }, { id: 2 }, { id: 3 }],
  [{ id: 4 }, { id: 5 }, { id: 6 }],
  [{ id: 7 }, { id: 8 }, { id: 9 }],
  [{ id: 1 }, { id: 4 }, { id: 7 }],
  [{ id: 2 }, { id: 5 }, { id: 8 }],
  [{ id: 3 }, { id: 6 }, { id: 9 }],
  [{ id: 1 }, { id: 5 }, { id: 9 }],
  [{ id: 3 }, { id: 5 }, { id: 7 }],
];
