import { useContext, createContext, useState } from "react";
import { GameContextType, GameMode } from "../../models/game.models";
import { usePvAiGameLogic } from "./hooks/usePvAiGameLogic";
import { usePvPGameLogic } from "./hooks/usePvPGameLogic";

const GameContext = createContext<GameContextType | null>(null);

export const GameContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [gameMode, SetGameMode] = useState<GameMode>(GameMode.PLAYER_VS_PLAYER);

  const pvpGame = usePvPGameLogic();
  const pvAiGame = usePvAiGameLogic();

  const gameModeFunctionality =
    gameMode === GameMode.PLAYER_VS_PLAYER ? pvpGame : pvAiGame;

  const choseGameMode: (gameMode: GameMode) => void = (gameMode) => {
    gameModeFunctionality.resetState();
    SetGameMode(() => gameMode);
  };

  const contextState: GameContextType = {
    gameModeFunctionality,
    changeGameModeFunctionality: {
      gameMode,
      choseGameMode,
    },
  };

  return (
    <GameContext.Provider value={contextState}>{children}</GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
