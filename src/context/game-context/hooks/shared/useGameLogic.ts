import { useState } from "react";
import { gameCubes } from "../../../../utils/constants";
import {
  CurrentPlayer,
  GameCube,
  WinnerPlayer,
} from "../../../../models/game.models";

export const useGameLogic = () => {
  const [cubes, setCubes] = useState<GameCube[]>(gameCubes);
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>(
    CurrentPlayer.PLAYER_ONE
  );
  const [winner, setWinner] = useState<WinnerPlayer | null>(null);
  const [notifyWinner, SetNotifyWinner] = useState(false);

  const resetState: () => void = () => {
    setCurrentPlayer(() => CurrentPlayer.PLAYER_ONE);
    setWinner(() => null);
    SetNotifyWinner(() => false);

    setCubes(() => gameCubes);
  };

  const setPlayerState = () => {
    setCurrentPlayer((prevPlayer) =>
      prevPlayer === CurrentPlayer.PLAYER_ONE
        ? CurrentPlayer.PLAYER_TWO
        : CurrentPlayer.PLAYER_ONE
    );
  };

  return {
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
  };
};
