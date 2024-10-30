import { useGame } from "../../context/game-context/GameContext";
import { generateTitle } from "../../utils/helpers";
import { HeaderStyled } from "./HeaderStyles";

const Header = () => {
  const {
    gameModeFunctionality: { currentPlayer, winner },
  } = useGame();
  const currenPlayerTitle =
    currentPlayer === "PlayerOne" ? "Player One's Move" : "Player Two's Move";

  const winnerTitle = generateTitle(winner);
  return (
    <HeaderStyled>
      {winnerTitle ? <h1>{winnerTitle}</h1> : <h1>{currenPlayerTitle}</h1>}
    </HeaderStyled>
  );
};

export default Header;
