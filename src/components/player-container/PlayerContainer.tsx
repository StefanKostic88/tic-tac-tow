import { useGame } from "../../context/game-context/GameContext";

import {
  PlayerContainerStyled,
  CostumeButtonStyled,
  PlayerContainerOverlay,
} from "./PlayerContainerStyles";
import { generatePlayerTitle } from "../../utils/helpers";

const PlayerContainer = () => {
  const {
    gameModeFunctionality: { notifyWinner, winner, resetState },
  } = useGame();
  const title =
    notifyWinner && winner === "Draw" ? "Draw" : generatePlayerTitle(winner);

  return (
    <>
      {title && (
        <PlayerContainerOverlay>
          <PlayerContainerStyled>
            <h2>{title}</h2>
            <CostumeButtonStyled onClick={resetState}>
              Go Again
            </CostumeButtonStyled>
          </PlayerContainerStyled>
        </PlayerContainerOverlay>
      )}
    </>
  );
};

export default PlayerContainer;
