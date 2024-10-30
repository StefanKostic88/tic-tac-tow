import Cube from "./cube/Cube";

import { useGame } from "../../context/game-context/GameContext";
import { GridContainerStyled } from "./MainGameContainerStyles";

const MainGameContainer = (): React.JSX.Element => {
  const {
    gameModeFunctionality: { gameCubes, notifyWinner, onSelectCube },
  } = useGame();

  return (
    <GridContainerStyled>
      {gameCubes.map((cube) => (
        <Cube {...{ cube, onSelectCube, notifyWinner }} key={cube.cubeId} />
      ))}
    </GridContainerStyled>
  );
};

export default MainGameContainer;
