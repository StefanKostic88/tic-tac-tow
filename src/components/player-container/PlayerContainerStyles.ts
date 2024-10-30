import styled from "styled-components";
import { fadeIn } from "../../animations/animations";

export const PlayerContainerOverlay = styled.div`
  position: absolute;
  background-color: black;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: ${fadeIn} 2000ms ease-in-out;
`;

export const PlayerContainerStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: black;
  animation: ${fadeIn} 2000ms ease-in-out;

  min-width: calc(450px + 2rem);
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 3rem 2rem;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.colors.boxShadowPrimar};
  gap: 3rem;
  align-items: center;

  transition: all 300ms;

  h2 {
    font-size: 36px;
    letter-spacing: 1px;
  }
`;

export const CostumeButtonStyled = styled.button`
  padding: 15px 25px;
  background-color: transparent;
  border: none;
  outline: none;
  box-shadow: ${({ theme }) => theme.colors.boxShadowPrimar};
  color: inherit;
  font-size: 22px;
  border-radius: 7px;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 1px;
`;
