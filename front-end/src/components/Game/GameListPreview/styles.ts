import Link from "next/link";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 2rem;
  margin-bottom: 0.1rem;
  max-width: 1110px;
  width: 100%;
  height: 100%;
`;

export const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 1rem;
  max-width: 1200px;
  height: fit-content;
  gap: 10px;
  overflow-x: hidden;
  scroll-behavior: smooth;
`;

export const ButtonsContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 2.5%;

`;

export const Title = styled.h1`
  width: fit-content;
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.black};
  font-family: "proxima-nova-condensed-bold", sans-serif;
  font-size: 32px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const Line = styled.hr`
  width: 100%;
  border-top: 2px solid #333;
`;

export const GamesContainers = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.5%;
  padding: 0;
  height: fit-content;
  align-items: start;
  align-content: start;
  gap: 25px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
  align-items: center;
  align-content: center;
  gap: 10px;
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const ArrowsRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
  align-items: center;
  align-content: center;
  gap: 10px;
  width: 100%;
`;


export const RowsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: 100%;
  height: fit-content;
  align-items: center;
  align-content: center;
  justify-content: space-between;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
  height: fit-content;
`;

export const Label = styled(Link)`
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.light_grey};
  font-family: "proxima-nova-regular", sans-serif;
  font-size: 16px;

  &:hover {
    text-decoration-line: underline;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const ScrollButton = styled.button`
  transform: translateY(-50%);
  padding: 0%;
  margin: 0%;
  font-size: 24px;
  border: none;
  background: transparent;
  color: ${(props) => props.theme.nord.black};
  cursor: pointer;
  z-index: 1;

  &:first-child {
    left: 0;
  }

  &:last-child {
    right: 0;
  }
`;

export const StyledArrowLeft = styled(FaRegArrowAltCircleLeft)`
  position: absolute;
  font-size: 40px;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
  @media (max-width: 768px) {
    font-size: 30px;
  }
  &:hover {
    color:${(props) => props.theme.nord.dark3};
  }
`;

export const StyledArrowRight = styled(FaRegArrowAltCircleRight)`
  position: absolute;
  font-size: 40px;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
  @media (max-width: 768px) {
    font-size: 30px;
  }
  &:hover {
    color:${(props) => props.theme.nord.dark3};
  }
`;
