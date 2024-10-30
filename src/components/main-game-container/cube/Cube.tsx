import React from "react";
import { GameCube } from "../../../models/game.models";
import { GridItemStyled } from "../MainGameContainerStyles";
import { MdClose, MdRadioButtonUnchecked } from "react-icons/md";

interface CubeComponent {
  cube: GameCube;
  onSelectCube: (cubeId: number) => void;
  notifyWinner: boolean;
}

const Cube: React.FC<CubeComponent> = React.memo(
  ({ cube, onSelectCube, notifyWinner }): React.JSX.Element => {
    const playerOneMark = cube.player === "PlayerOne" && <MdClose />;
    const playerTwoMark = cube.player === "PlayerTwo" && (
      <MdRadioButtonUnchecked />
    );

    const addStyles = notifyWinner && cube.winner;

    return (
      <GridItemStyled
        touched={cube.touched}
        isWinner={addStyles}
        onClick={() => !cube.touched && onSelectCube(cube.cubeId)}
      >
        {cube.player ? playerOneMark || playerTwoMark : ""}
      </GridItemStyled>
    );
  }
);

export default Cube;
