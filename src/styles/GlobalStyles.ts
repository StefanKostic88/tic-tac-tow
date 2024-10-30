import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

body {
  box-sizing: border-box;
  background-color: black;
  color: ${({ theme }) => theme.colors.textPrimery};

  font-family: 'Press Start 2P', cursive, sans-serif;  
}
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

ul {
  padding: 0;
}
li {
  list-style: none;
}
img {
  display: block;
}
`;

export default GlobalStyles;
