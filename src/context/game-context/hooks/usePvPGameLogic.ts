import { useCallback } from "react";
import { WinnerPlayer } from "../../../models/game.models";
import {
  checkForWinner,
  chekAndGenerateWinnerType,
  updateCubes,
  addWinnerCubes,
} from "../../../utils/helpers";

import { useGameLogic } from "./shared/useGameLogic";

export const usePvPGameLogic = () => {
  const {
    cubes,
    setCubes,
    currentPlayer,
    winner,
    setWinner,
    notifyWinner,
    SetNotifyWinner,
    resetState,
    setPlayerState,
  } = useGameLogic();

  const onSelectCube: (coubeId: number) => void = useCallback(
    (coubeId: number) => {
      if (winner) return;
      setCubes((prev) => {
        const updatedCubes = updateCubes(prev, coubeId, currentPlayer);

        const hasWinner = checkForWinner(updatedCubes);
        if (hasWinner) {
          const winningPlayer = chekAndGenerateWinnerType(currentPlayer);

          setWinner(() => winningPlayer);
          SetNotifyWinner(() => true);

          setCubes(addWinnerCubes(updatedCubes, hasWinner));
        } else if (updatedCubes.every((cube) => cube.touched)) {
          setWinner(() => WinnerPlayer.DRAW);
        }

        return updatedCubes;
      });
      setPlayerState();
    },
    [
      SetNotifyWinner,
      currentPlayer,
      setCubes,
      setPlayerState,
      setWinner,
      winner,
    ]
  );

  return {
    gameCubes: cubes,
    winner,
    currentPlayer,
    notifyWinner,
    onSelectCube,
    resetState,
  };
};
