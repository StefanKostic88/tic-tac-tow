import { CurrentPlayer, WinnerPlayer } from "../../../models/game.models";
import { checkForWinnerAi } from "../../../utils/helpers";

import { findBestMove, updateCubes } from "../../../utils/helpers";
import { useGameLogic } from "./shared/useGameLogic";

export const usePvAiGameLogic = () => {
  const {
    cubes,
    setCubes,
    currentPlayer,
    setCurrentPlayer,
    winner,
    setWinner,
    notifyWinner,
    SetNotifyWinner,
    resetState,
    setPlayerState,
  } = useGameLogic();

  const endGame = (winner: WinnerPlayer) => {
    setWinner(() => winner);
    SetNotifyWinner(() => true);
  };

  const onSelectCube = (cubeId: number) => {
    if (winner || cubes[cubeId - 1].touched) return;

    const updatedCubes = [...updateCubes(cubes, cubeId, currentPlayer)];

    const hasWinner = checkForWinnerAi(updatedCubes, currentPlayer);
    if (hasWinner) {
      endGame(hasWinner);

      return;
    } else if (updatedCubes.every((cube) => cube.touched)) {
      endGame(WinnerPlayer.DRAW);

      return;
    }

    setCubes(() => [...updatedCubes]);
    setCurrentPlayer(() => CurrentPlayer.PLAYER_TWO);

    const aiMove = findBestMove(updatedCubes, CurrentPlayer.PLAYER_TWO);
    if (aiMove !== -1) {
      updatedCubes[aiMove - 1] = {
        ...updatedCubes[aiMove - 1],
        touched: true,
        player: CurrentPlayer.PLAYER_TWO,
      };

      const aiWinner = checkForWinnerAi(updatedCubes, CurrentPlayer.PLAYER_TWO);
      if (aiWinner) {
        endGame(aiWinner);
      } else if (updatedCubes.every((cube) => cube.touched)) {
        endGame(WinnerPlayer.DRAW);
      } else {
        setPlayerState();
      }

      setCubes(() => [...updatedCubes]);
    }
  };

  return {
    gameCubes: cubes,
    winner,
    currentPlayer,
    notifyWinner,
    onSelectCube,
    resetState,
  };
};
