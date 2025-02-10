import styled from "styled-components";
export const AppStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  minheight: 500px;
  gap: 2rem;
`;

export const ButtonControlsContainer = styled.div`
  display: flex;
  gap: 2rem;
  & button {
    padding: 10px 20px;
    background-color: transparent;
    border: none;
    outline: none;
    box-shadow: ${({ theme }) => theme.colors.boxShadowPrimar};
    color:  rgb(72 219 251);
    font-size: 22px;
    border-radius: 7px;
    cursor: pointer;
    font-family: inherit;
    letter-spacing: 1px;
    transition: background-color 700ms ease, box-shadow 700ms ease, color 700ms ease, scale 700ms ease;
    opacity: 0.5;

    &.active {
     opacity: 1;
     scale: 1.05;
    }
    }
  }
`;
