import "./App.css";
import GlobalStyles from "./styles/GlobalStyles";
import {
  AppStyled,
  MainContainerStyled,
  ButtonControlsContainer,
} from "./AppStyles";

import { Header, MainGameContainer, PlayerContainer } from "./components";
import { useGame } from "./context/game-context/GameContext";
import { GameMode } from "./models/game.models";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/Theme";
import { buttonConfigFactory } from "./utils/helpers";

function App() {
  const {
    changeGameModeFunctionality: { choseGameMode, gameMode },
  } = useGame();

  const buttonConfiguration = [
    {
      currentMode: gameMode,
      gameMode: GameMode.PLAYER_VS_PLAYER,
      choseGameMode,
    },
    {
      currentMode: gameMode,
      gameMode: GameMode.PLAYER_VS_AI,
      choseGameMode,
    },
  ].map(({ currentMode, gameMode, choseGameMode }) =>
    buttonConfigFactory(currentMode, gameMode, choseGameMode)
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppStyled>
        <Header />
        <MainContainerStyled>
          <ButtonControlsContainer>
            {buttonConfiguration.map(({ handler, active, content }, index) => (
              <button onClick={handler} key={index} className={active}>
                {content}
              </button>
            ))}
          </ButtonControlsContainer>
          <MainGameContainer />
          <PlayerContainer />
        </MainContainerStyled>
      </AppStyled>
    </ThemeProvider>
  );
}

export default App;
