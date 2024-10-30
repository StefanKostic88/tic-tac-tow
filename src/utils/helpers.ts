import {
  ButtonConfiguration,
  CurrentPlayer,
  GameCube,
  GameMode,
  WinnerPlayer,
} from "../models/game.models";
import { winnerData } from "./constants";

export const generateTitle: (
  winnerPlayer: WinnerPlayer | null
) => null | string = (winnerPlayer) => {
  if (!winnerPlayer) return null;

  const dictionary = {
    [WinnerPlayer.PLAYER_ONE]: "Player One Wins",
    [WinnerPlayer.PLAYER_TWO]: "Player Two Wins",
    [WinnerPlayer.DRAW]: "Draw",
  };

  return dictionary[winnerPlayer];
};

export const generatePlayerTitle: (
  winnerPlayer: WinnerPlayer | null
) => null | string = (winnerPlayer) => {
  if (!winnerPlayer) return null;

  const dictionary = {
    [WinnerPlayer.PLAYER_ONE]: "Player One Wins",
    [WinnerPlayer.PLAYER_TWO]: "Player Two Wins",
    [WinnerPlayer.DRAW]: "Draw",
  };

  return dictionary[winnerPlayer];
};

export const checkForWinner = (cubes: GameCube[]) => {
  for (let combination of winnerData) {
    const [combA, combB, combC] = combination.map(({ id }) => id);
    const cubeA = cubes.find((cube) => cube.cubeId === combA);
    const cubeB = cubes.find((cube) => cube.cubeId === combB);
    const cubeC = cubes.find((cube) => cube.cubeId === combC);

    if (
      cubeA?.player &&
      cubeA.player === cubeB?.player &&
      cubeA.player === cubeC?.player
    ) {
      return [cubeA, cubeB, cubeC];
    }
  }
};

export const checkForWinnerAi = (
  cubes: GameCube[],
  currentPlayer: CurrentPlayer
): WinnerPlayer | null => {
  cubes.forEach((cube) => (cube.winner = false));
  for (const combination of winnerData) {
    const isWinningCombo = combination.every(
      (cube) => cubes[cube.id - 1].player === currentPlayer //
    );

    if (isWinningCombo) {
      combination.forEach((cube) => (cubes[cube.id - 1].winner = true));
      return currentPlayer === CurrentPlayer.PLAYER_ONE
        ? WinnerPlayer.PLAYER_ONE
        : WinnerPlayer.PLAYER_TWO;
    }
  }
  return null;
};

// usePvPGameLogic Helpers

export const chekAndGenerateWinnerType = (currentPlayer: CurrentPlayer) => {
  const winningPlayer =
    currentPlayer === CurrentPlayer.PLAYER_ONE
      ? WinnerPlayer.PLAYER_ONE
      : WinnerPlayer.PLAYER_TWO;

  return winningPlayer;
};

export const updateCubes = (
  prev: GameCube[],
  coubeId: number,
  currentPlayer: CurrentPlayer
) => {
  return prev.map((cube) =>
    cube.cubeId === coubeId
      ? { ...cube, touched: true, player: currentPlayer }
      : cube
  ) as GameCube[];
};

export const addWinnerCubes = (data: GameCube[], hasWinner: GameCube[]) => {
  return data.map((cube) =>
    hasWinner.map((el) => el.cubeId).includes(cube.cubeId)
      ? { ...cube, winner: true }
      : cube
  );
};

//usePvAiGameLogic helpers

const cloneCubesFunction = (currentCubes: GameCube[]): GameCube[] => {
  return currentCubes.map((cube) => ({ ...cube })) as GameCube[];
};

export const minimax = (
  cubes: GameCube[],
  depth: number,
  isMaximizing: boolean,
  currentPlayer: CurrentPlayer
): number => {
  const cloneCubes = cloneCubesFunction(cubes);

  const winner = checkForWinnerAi(cloneCubes, currentPlayer);

  if (winner === WinnerPlayer.PLAYER_ONE) return -10 + depth;
  if (winner === WinnerPlayer.PLAYER_TWO) return 10 - depth;
  if (cloneCubes.every((cube) => cube.touched)) return 0; // Draw condition

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const cube of cloneCubes) {
      if (!cube.touched) {
        cube.touched = true;
        cube.player = CurrentPlayer.PLAYER_TWO;

        const evalTest = minimax(
          cloneCubes,
          depth + 1,
          false,
          CurrentPlayer.PLAYER_ONE
        );

        cube.touched = false;
        cube.player = null;

        maxEval = Math.max(maxEval, evalTest);
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const cube of cloneCubes) {
      if (!cube.touched) {
        cube.touched = true;
        cube.player = CurrentPlayer.PLAYER_ONE;

        const evalTest = minimax(
          cloneCubes,
          depth + 1,
          true,
          CurrentPlayer.PLAYER_TWO
        );

        cube.touched = false;
        cube.player = null;

        minEval = Math.min(minEval, evalTest);
      }
    }
    return minEval;
  }
};

export const findBestMove = (
  currentCubes: GameCube[],
  currentPlayer: CurrentPlayer
) => {
  const cloneCubes = cloneCubesFunction(currentCubes);

  let bestScore = -Infinity;
  let move = -1;

  for (const cube of cloneCubes) {
    if (!cube.touched) {
      cube.touched = true;
      cube.player = CurrentPlayer.PLAYER_TWO;

      const score = minimax(cloneCubes, 0, false, currentPlayer);

      cube.touched = false;
      cube.player = null;

      if (score > bestScore) {
        bestScore = score;
        move = cube.cubeId;
      }
    }
  }
  return move;
};

export const buttonConfigFactory = (
  currentGameMode: GameMode,
  gameMode: GameMode,
  choseGameMode: (gameMode: GameMode) => void
) => {
  const contentDictionery = {
    [GameMode.PLAYER_VS_PLAYER]: "Player vs Player",
    [GameMode.PLAYER_VS_AI]: "Player vs Ai",
  };
  return {
    handler: () => {
      choseGameMode(gameMode);
    },
    active: currentGameMode === gameMode ? "active" : "",
    content: contentDictionery[gameMode],
  } as ButtonConfiguration;
};
