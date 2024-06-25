import styled, { keyframes } from "styled-components";
import { FiHeart } from "react-icons/fi";
import theme from '../../styles/theme';

const heartbeat = keyframes`
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
    transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
`;


export const Container = styled.div`
  max-width: 21rem;
  height: 29.2rem;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  border: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_200};
  border-radius: 0.8rem;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  position: relative;

  svg {
    cursor: pointer;
  }

  > svg {
    color: ${({ theme }) => theme.COLORS.GRAY_200};
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
  }

  > img {
    max-width: 88px;
    margin-top: ${({ $Isadmin }) => ($Isadmin ? "4.6rem" : "none")};
    cursor: pointer;
  }

  > span {
    line-height: 100%;
    color: ${({ theme }) => theme.COLORS.LIGHT_BLUE};
    margin-bottom: ${({ $Isadmin }) => ($Isadmin ? "4.6rem" : "none")};
  }

  @media (min-width: 1024px) {
    max-width: 30.4rem;
    height: 46.2rem;
    gap: 1.5rem;

    > svg {
      right: 1.8rem;
    }

    > img {
      max-width: 17.6rem;
      margin-top: ${({ $Isadmin }) => ($Isadmin ? "3.2rem" : "none")};
    }
    > p {
      font-size: 1.4rem;
      line-height: 160%;
      text-align: center;
      color: ${({ theme }) => theme.COLORS.GRAY_100};
      overflow: hidden;
    }

    > span {
      font-size: 3.2rem;
      line-height: 160%;
      margin-bottom: ${({ $Isadmin }) => ($Isadmin ? "3.2rem" : "none")};
    }
  }
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.COLORS.GRAY_200};

  > h2 {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.4rem;
    text-align: center;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 1024px) {
    > h2 {
      font-weight: 700;
      font-size: 2.4rem;
      line-height: 140%;
    }
  }
`;

export const OrderChosen = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;

  > button {
    padding: 0.4rem 2.4rem;
  }

  @media (min-width: 1024px) {
    width: fit-content;
    flex-direction: row;

    > button {
      padding: 1.2rem 2.4rem;
    }
  }
`;

export const StyledFiHeart = styled(FiHeart)`
  fill: ${({ isfavorite }) => (isfavorite === "true" ? "#B31B1B" : "transparent")};
  stroke: ${({ isfavorite }) => (isfavorite === "true" ? "#B31B1B" : theme.COLORS.GRAY_200)};
  stroke-width: 2;
  

  &:hover {
    fill: #B31B1B; 
    stroke: #B31B1B; 
    cursor: pointer; 
    animation: ${heartbeat} 1.5s ease-in-out infinite; 
  }
`;