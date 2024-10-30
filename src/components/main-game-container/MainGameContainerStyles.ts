import styled from "styled-components";

export const GridContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 18px;
  justify-content: center;
  margin-top: 7rem;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.colors.boxShadowPrimar};
`;

export interface GridItemStyledProps {
  touched: boolean;
  isWinner: boolean;
}

export const GridItemStyled = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "touched" && prop !== "isWinner",
})<GridItemStyledProps>`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.colors.boxShadowPrimar};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  transition: all 700ms;

  background-color: ${(props) =>
    props.touched
      ? props.touched && props.isWinner
        ? "#752351"
        : null
      : "#4848488a"};
  color: ${(props) => (props.touched ? "#b7b7b7" : "#4848488a")};
  transform: ${(props) => (props.touched ? "scale(1.05)" : null)};
  transform: ${(props) => (props.isWinner ? "scale(1.2)" : null)};

  svg {
    width: 75px;
    height: 75px;
  }
`;
