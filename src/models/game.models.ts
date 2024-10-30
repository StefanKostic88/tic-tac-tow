export interface GameCube {
  cubeId: number;
  touched: boolean;
  player: null | "PlayerOne" | "PlayerTwo";
  winner: boolean;
}
export type WinnerData = { id: number }[][];

export enum CurrentPlayer {
  PLAYER_ONE = "PlayerOne",
  PLAYER_TWO = "PlayerTwo",
}

export enum WinnerPlayer {
  PLAYER_ONE = "PlayerOne",
  PLAYER_TWO = "PlayerTwo",
  DRAW = "Draw",
}

export type GameContextType = {
  gameModeFunctionality: {
    gameCubes: GameCube[];
    currentPlayer: CurrentPlayer;
    winner: WinnerPlayer | null;
    notifyWinner: boolean;
    onSelectCube: (coubeId: number) => void;
    resetState: () => void;
  };
  changeGameModeFunctionality: {
    choseGameMode: (gameMode: GameMode) => void;
    gameMode: GameMode;
  };
};

export enum GameMode {
  PLAYER_VS_PLAYER = "PVP",
  PLAYER_VS_AI = "PVAI",
}

export interface ButtonConfiguration {
  handler: () => void;
  active: string;
  content: string;
}
